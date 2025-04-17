# Car Rental Backend Proposal

## Technology Stack

### Core Backend
- **Framework**: FastAPI
- **Language**: Python 3.11+
- **Databases**: 
  - PostgreSQL with SQLAlchemy ORM (Primary transactional DB)
  - Apache Cassandra (High-throughput time-series data)
  - DuckDB (Analytics and reporting)
- **Authentication**: JWT + Phone OTP
- **API Documentation**: OpenAPI (Swagger) & ReDoc
- **Testing**: pytest
- **Task Queue**: Celery with Redis
- **Cache**: Redis
- **Container**: Docker & Docker Compose

### AI Integration
- **Machine Learning Framework**: TensorFlow/PyTorch
- **ML Operations**: MLflow
- **Vector Database**: Pinecone
- **AI Services Integration**: OpenAI API

## Architecture Overview

```mermaid
flowchart TD
    subgraph Backend[Backend Services]
        API[FastAPI Service]
        DB[(PostgreSQL)]
        Cache[(Redis Cache)]
        AI[AI Services]
        Task[Celery Workers]
    end

    API --> DB
    API --> Cache
    API --> AI
    API --> Task
```

## Core Features

### 1. User Management
- Phone number authentication with OTP
- Role-based access control (Admin, User)
- JWT token management
- User profile management
- Session handling

### 2. Car Management
- CRUD operations for cars
- Car availability tracking
- Image processing and storage
- Car categorization
- Pricing management

### 3. Booking System
- Real-time booking management
- Payment integration
- Booking status tracking
- Cancellation handling
- Dynamic pricing

### 4. AI-Powered Features

#### Smart Pricing Engine
```python
class SmartPricingEngine:
    def calculate_dynamic_price(self, base_price: float, factors: Dict[str, Any]) -> float:
        """
        Calculate dynamic price based on:
        - Historical booking data
        - Current demand
        - Seasonal trends
        - Local events
        - Competition pricing
        """
        return adjusted_price
```

#### Car Recommendation System
```python
class RecommendationEngine:
    def get_personalized_recommendations(self, user_id: str) -> List[Car]:
        """
        Generate personalized car recommendations using:
        - User booking history
        - Similar user preferences
        - Current availability
        - Location-based preferences
        """
        return recommended_cars
```

#### Predictive Maintenance
```python
class MaintenancePredictor:
    def predict_maintenance_needs(self, car_id: str) -> Dict[str, Any]:
        """
        Predict maintenance requirements using:
        - Mileage data
        - Usage patterns
        - Historical maintenance records
        - Sensor data (if available)
        """
        return maintenance_predictions
```

## API Design

### FastAPI Implementation

```python
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session

app = FastAPI(
    title="Car Rental API",
    description="AI-Powered Car Rental Backend API",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Dependency injection
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Authentication middleware
async def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
) -> User:
    return verify_token(token, db)
```

### API Routes Structure

```
/api
├── /auth
│   ├── /login
│   ├── /verify-otp
│   └── /refresh-token
├── /users
│   ├── /profile
│   └── /preferences
├── /cars
│   ├── /available
│   ├── /recommendations
│   └── /pricing
├── /bookings
│   ├── /create
│   ├── /status
│   └── /history
└── /admin
    ├── /analytics
    ├── /manage-cars
    └── /manage-users
```

## Database Schemas

### PostgreSQL Schema (Transactional Data)
```sql
-- Core business logic tables
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    phone VARCHAR(15) UNIQUE NOT NULL,
    name VARCHAR(100),
    email VARCHAR(255),
    role VARCHAR(20) NOT NULL DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE cars (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    model VARCHAR(100) NOT NULL,
    make VARCHAR(100) NOT NULL,
    year INTEGER NOT NULL,
    base_price DECIMAL(10,2) NOT NULL,
    available BOOLEAN DEFAULT true,
    features JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    car_id UUID REFERENCES cars(id),
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### Cassandra Schema (Time-Series Data)
```sql
-- Car telemetry and location tracking
CREATE KEYSPACE car_rental WITH replication = {
    'class': 'SimpleStrategy',
    'replication_factor': 3
};

USE car_rental;

CREATE TABLE car_telemetry (
    car_id uuid,
    timestamp timestamp,
    location frozen<point>,
    speed float,
    fuel_level float,
    engine_temp float,
    battery_level float,
    PRIMARY KEY ((car_id), timestamp)
) WITH CLUSTERING ORDER BY (timestamp DESC);

CREATE TABLE location_history (
    car_id uuid,
    date date,
    timestamp timestamp,
    location frozen<point>,
    PRIMARY KEY ((car_id, date), timestamp)
) WITH CLUSTERING ORDER BY (timestamp DESC);

CREATE TABLE maintenance_logs (
    car_id uuid,
    log_date date,
    timestamp timestamp,
    sensor_data map<text, float>,
    maintenance_flags set<text>,
    PRIMARY KEY ((car_id, log_date), timestamp)
);
```

### DuckDB Schema (Analytics)
```sql
-- Analytics and reporting tables
CREATE TABLE daily_metrics (
    date DATE PRIMARY KEY,
    total_bookings INTEGER,
    total_revenue DECIMAL(15,2),
    active_cars INTEGER,
    avg_booking_duration INTERVAL,
    peak_hours INTEGER[]
);

CREATE TABLE car_analytics (
    car_id UUID,
    date DATE,
    utilization_rate FLOAT,
    revenue DECIMAL(10,2),
    maintenance_cost DECIMAL(10,2),
    avg_trip_duration INTERVAL,
    popular_routes JSON,
    PRIMARY KEY (car_id, date)
);

CREATE TABLE pricing_factors (
    timestamp TIMESTAMP,
    location POINT,
    demand_factor FLOAT,
    event_impact FLOAT,
    weather_factor FLOAT,
    competition_factor FLOAT,
    PRIMARY KEY (timestamp, location)
);
```

### Data Integration Patterns

1. **Real-time Data Flow**:
```python
class DataIntegrator:
    async def handle_telemetry_data(self, car_id: UUID, telemetry: Dict[str, Any]):
        # Write to Cassandra for time-series storage
        await self.cassandra.execute(
            "INSERT INTO car_telemetry (car_id, timestamp, location, speed, fuel_level) VALUES (?, ?, ?, ?, ?)",
            [car_id, datetime.now(), telemetry['location'], telemetry['speed'], telemetry['fuel_level']]
        )
        
        # Push to Kafka for analytics processing
        await self.kafka_producer.send(
            'car-telemetry',
            key=str(car_id),
            value=telemetry
        )

    async def process_booking_event(self, booking: Dict[str, Any]):
        # Store transaction in PostgreSQL
        await self.postgres.execute(
            "INSERT INTO bookings (user_id, car_id, start_time, end_time, total_price) VALUES ($1, $2, $3, $4, $5)",
            booking['user_id'], booking['car_id'], booking['start_time'], booking['end_time'], booking['total_price']
        )
        
        # Update analytics in DuckDB
        await self.duckdb.execute("""
            INSERT INTO daily_metrics 
            SELECT date_trunc('day', CURRENT_TIMESTAMP), 
                   COUNT(*), SUM(total_price), 
                   COUNT(DISTINCT car_id),
                   AVG(end_time - start_time)
            FROM bookings 
            WHERE date_trunc('day', created_at) = date_trunc('day', CURRENT_TIMESTAMP)
        """)
```

2. **Analytics Pipeline**:
```python
class AnalyticsPipeline:
    async def aggregate_daily_metrics(self):
        # Aggregate data from all sources into DuckDB
        await self.duckdb.execute("""
            INSERT INTO car_analytics 
            SELECT 
                t.car_id,
                DATE(t.timestamp) as date,
                COUNT(*) / 24.0 as utilization_rate,
                SUM(b.total_price) as revenue,
                SUM(m.cost) as maintenance_cost,
                AVG(b.end_time - b.start_time) as avg_trip_duration,
                json_group_array(DISTINCT t.location) as popular_routes
            FROM car_telemetry t
            LEFT JOIN bookings b ON t.car_id = b.car_id 
                AND DATE(t.timestamp) = DATE(b.created_at)
            LEFT JOIN maintenance_logs m ON t.car_id = m.car_id 
                AND DATE(t.timestamp) = m.log_date
            GROUP BY t.car_id, DATE(t.timestamp)
        """)
```

## Development Setup

### Environment Setup
```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Docker Compose Configuration
```yaml
version: '3.8'
services:
  api:
    build: .
    ports:
      - "8000:8000"
    environment:
      - POSTGRES_URL=postgresql://user:password@postgres:5432/carrentaldb
      - CASSANDRA_HOSTS=cassandra
      - DUCKDB_PATH=/data/analytics.duckdb
      - REDIS_URL=redis://redis:6379
      - JWT_SECRET=your-secret-key
      - OPENAI_API_KEY=${OPENAI_API_KEY}
    volumes:
      - duckdb_data:/data
    depends_on:
      - postgres
      - cassandra
      - redis

  postgres:
    image: postgres:latest
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=carrentaldb
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  cassandra:
    image: cassandra:latest
    environment:
      - CASSANDRA_CLUSTER_NAME=car_rental_cluster
      - CASSANDRA_DC=datacenter1
    ports:
      - "9042:9042"
    volumes:
      - cassandra_data:/var/lib/cassandra
    healthcheck:
      test: ["CMD", "cqlsh", "-e", "describe keyspaces"]
      interval: 15s
      timeout: 10s
      retries: 10

  kafka:
    image: confluentinc/cp-kafka:latest
    environment:
      - KAFKA_BROKER_ID=1
      - KAFKA_ZOOKEEPER_CONNECT=zookeeper:2181
      - KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://kafka:9092
      - KAFKA_AUTO_CREATE_TOPICS_ENABLE=true
    depends_on:
      - zookeeper
    ports:
      - "9092:9092"

  zookeeper:
    image: confluentinc/cp-zookeeper:latest
    environment:
      - ZOOKEEPER_CLIENT_PORT=2181
    ports:
      - "2181:2181"

  redis:
    image: redis:alpine
    ports:
      - "6379:6379"

  celery_worker:
    build: .
    command: celery -A tasks worker --loglevel=info
    environment:
      - POSTGRES_URL=postgresql://user:password@postgres:5432/carrentaldb
      - CASSANDRA_HOSTS=cassandra
      - DUCKDB_PATH=/data/analytics.duckdb
      - REDIS_URL=redis://redis:6379
    volumes:
      - duckdb_data:/data
    depends_on:
      - redis
      - api

volumes:
  postgres_data:
  cassandra_data:
  duckdb_data:
  kafka_data:
```

## Security Measures

1. **Authentication & Authorization**
   - JWT token validation
   - Role-based access control
   - Phone number verification
   - Rate limiting

2. **Data Protection**
   - Data encryption at rest
   - HTTPS/TLS
   - Input validation
   - SQL injection prevention
   - XSS protection

3. **API Security**
   - Rate limiting
   - CORS configuration
   - Request validation
   - Error handling

## Testing Strategy

### Unit Tests
```python
def test_pricing_engine():
    engine = SmartPricingEngine()
    price = engine.calculate_dynamic_price(
        base_price=100.0,
        factors={
            "demand": 0.8,
            "season": "high",
            "day_of_week": "weekend"
        }
    )
    assert price > 100.0
```

### Integration Tests
```python
async def test_booking_creation():
    response = await client.post(
        "/api/bookings/create",
        json={
            "car_id": "test_car_id",
            "start_time": "2024-04-10T10:00:00Z",
            "end_time": "2024-04-11T10:00:00Z"
        }
    )
    assert response.status_code == 200
```

## Deployment Strategy

1. **Development Environment**
   - Local Docker setup
   - Debug mode enabled
   - Mock AI services

2. **Staging Environment**
   - Cloud deployment (AWS/GCP)
   - Test data
   - Limited AI integration

3. **Production Environment**
   - Kubernetes orchestration
   - Auto-scaling
   - Full AI integration
   - Monitoring & logging

## Performance Optimization

1. **Caching Strategy**
   - Redis for session data
   - Query result caching
   - AI prediction caching

2. **Database Optimization**
   - Indexing strategy
   - Query optimization
   - Connection pooling

3. **API Optimization**
   - Response compression
   - Pagination
   - Eager loading
   - Background tasks

## Monitoring & Logging

1. **Application Monitoring**
   - Prometheus metrics
   - Grafana dashboards
   - Error tracking

2. **AI Model Monitoring**
   - Model performance metrics
   - Prediction accuracy
   - Training metrics

3. **System Monitoring**
   - Resource utilization
   - API latency
   - Error rates

## Implementation Timeline

1. **Phase 1: Core Backend (2 weeks)**
   - Basic FastAPI setup
   - Database integration
   - Authentication system

2. **Phase 2: Basic Features (3 weeks)**
   - User management
   - Car management
   - Booking system

3. **Phase 3: AI Integration (4 weeks)**
   - Smart pricing
   - Recommendation system
   - Predictive maintenance

4. **Phase 4: Optimization (2 weeks)**
   - Performance tuning
   - Security hardening
   - Testing & documentation

## Future Enhancements

1. **Advanced AI Features**
   - Image recognition for car damage assessment
   - Natural language processing for customer support
   - Fraud detection system

2. **Platform Expansion**
   - Mobile app API endpoints
   - Third-party integrations
   - Analytics dashboard

3. **Technical Improvements**
   - GraphQL API
   - Real-time notifications
   - Advanced caching strategies

## Multi-Database Performance Optimization

### 1. Database-Specific Optimizations

#### PostgreSQL Optimization
```python
class PostgresOptimizer:
    async def optimize_queries(self):
        await self.db.execute("""
            -- Create indexes for common queries
            CREATE INDEX idx_bookings_date ON bookings(created_at);
            CREATE INDEX idx_cars_availability ON cars(available);
            
            -- Partition bookings table by date
            CREATE TABLE bookings_partitioned (
                LIKE bookings INCLUDING ALL
            ) PARTITION BY RANGE (created_at);
            
            -- Create monthly partitions
            CREATE TABLE bookings_y2024m04 PARTITION OF bookings_partitioned
            FOR VALUES FROM ('2024-04-01') TO ('2024-05-01');
        """)

#### Cassandra Optimization
```python
class CassandraOptimizer:
    async def optimize_timeseries(self):
        # Optimize time-series data storage
        await self.cassandra.execute("""
            ALTER TABLE car_telemetry
            WITH compaction = {
                'class': 'TimeWindowCompactionStrategy',
                'compaction_window_unit': 'DAYS',
                'compaction_window_size': 1
            }
            AND gc_grace_seconds = 86400;
        """)
```

#### DuckDB Optimization
```python
class DuckDBOptimizer:
    async def optimize_analytics(self):
        await self.duckdb.execute("""
            -- Create materialized views for common analytics queries
            CREATE MATERIALIZED VIEW hourly_stats AS
            SELECT 
                date_trunc('hour', timestamp) as hour,
                COUNT(*) as event_count,
                AVG(demand_factor) as avg_demand
            FROM pricing_factors
            GROUP BY date_trunc('hour', timestamp);
            
            -- Enable parallel query execution
            PRAGMA threads=8;
        """)
```
### 2. Cross-Database Synchronization

```python
class DatabaseSynchronizer:
    async def sync_data(self):
        # Sync relevant data from PostgreSQL to DuckDB for analytics
        await self.duckdb.execute("""
            INSERT INTO car_analytics
            SELECT * FROM postgres_fdw_cars
            WHERE updated_at > last_sync_timestamp;
        """)
        
        # Aggregate time-series data from Cassandra to DuckDB
        await self.duckdb.execute("""
            INSERT INTO daily_metrics
            SELECT 
                date_trunc('day', timestamp) as date,
                COUNT(*) as total_events,
                AVG(speed) as avg_speed
            FROM cassandra_fdw_car_telemetry
            GROUP BY date_trunc('day', timestamp);
        """)
```
### 3. Performance Monitoring

```python
class DatabaseMonitor:
    async def monitor_performance(self):
        # Monitor PostgreSQL
        pg_metrics = await self.postgres.execute("""
            SELECT * FROM pg_stat_database 
            WHERE datname = current_database();
        """)
        
        # Monitor Cassandra
        cass_metrics = await self.cassandra.execute("""
            SELECT * FROM system.peer_metrics 
            WHERE peer = '127.0.0.1';
        """)
        
        # Monitor DuckDB
        duck_metrics = await self.duckdb.execute("""
            SELECT * FROM pragma_database_size();
        """)
        
        await self.prometheus.push_metrics({
            'postgresql': pg_metrics,
            'cassandra': cass_metrics,
            'duckdb': duck_metrics
        })
```
### 4. Backup and Recovery Strategy

```python
class DatabaseBackup:
    async def backup_all_databases(self):
        # PostgreSQL backup
        await self.run_command(
            f"pg_dump -Fc -f backup/postgres_{datetime.now()}.dump"
        )
        
        # Cassandra backup per keyspace
        await self.run_command(
            f"nodetool snapshot car_rental"
        )
        
        # DuckDB backup
        await self.duckdb.execute(
            f"EXPORT DATABASE 'backup/analytics_{datetime.now()}.db'"
        )
```
