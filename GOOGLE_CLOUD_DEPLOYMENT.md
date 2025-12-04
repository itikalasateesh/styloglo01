# 🚀 Google Cloud Deployment Guide - StyloGlo

## 📋 Prerequisites

- Google Cloud account
- Google Cloud CLI (`gcloud`) installed
- Docker installed (for local testing)
- Project with billing enabled

---

## ✅ Files Created

The following files have been added to your project for deployment:

1. **`Dockerfile`** - Multi-stage build configuration
2. **`nginx.conf`** - Nginx server configuration
3. **`.dockerignore`** - Excludes unnecessary files from Docker build
4. **`.gcloudignore`** - Excludes files from Google Cloud deployment

---

## 🔧 Deployment Steps

### Option 1: Google Cloud Run (Recommended)

#### Step 1: Install Google Cloud CLI
```bash
# macOS
brew install google-cloud-sdk

# Or download from: https://cloud.google.com/sdk/docs/install
```

#### Step 2: Login and Set Project
```bash
# Login to Google Cloud
gcloud auth login

# Set your project ID
gcloud config set project YOUR_PROJECT_ID

# Enable required APIs
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
```

#### Step 3: Build and Deploy
```bash
# Navigate to project directory
cd /Users/sateeshkumar/Desktop/styloglo

# Deploy to Cloud Run (builds and deploys in one command)
gcloud run deploy styloglo \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --port 8080 \
  --memory 512Mi \
  --cpu 1 \
  --min-instances 0 \
  --max-instances 10
```

#### Step 4: Set Environment Variables (if needed)
```bash
# Add your Gemini API key
gcloud run services update styloglo \
  --update-env-vars GEMINI_API_KEY=your_api_key_here \
  --region us-central1
```

---

### Option 2: Google App Engine

#### Step 1: Create `app.yaml`
Create a file named `app.yaml` in your project root:

```yaml
runtime: custom
env: flex

automatic_scaling:
  min_num_instances: 1
  max_num_instances: 10
  cool_down_period_sec: 120
  cpu_utilization:
    target_utilization: 0.6

resources:
  cpu: 1
  memory_gb: 0.5
  disk_size_gb: 10

env_variables:
  GEMINI_API_KEY: "your_api_key_here"
```

#### Step 2: Deploy
```bash
gcloud app deploy
```

---

### Option 3: Google Kubernetes Engine (GKE)

#### Step 1: Build and Push Docker Image
```bash
# Set variables
PROJECT_ID=your-project-id
IMAGE_NAME=styloglo
REGION=us-central1

# Build the image
docker build -t gcr.io/$PROJECT_ID/$IMAGE_NAME:latest .

# Push to Google Container Registry
docker push gcr.io/$PROJECT_ID/$IMAGE_NAME:latest
```

#### Step 2: Create Kubernetes Deployment
Create `k8s-deployment.yaml`:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: styloglo
spec:
  replicas: 2
  selector:
    matchLabels:
      app: styloglo
  template:
    metadata:
      labels:
        app: styloglo
    spec:
      containers:
      - name: styloglo
        image: gcr.io/YOUR_PROJECT_ID/styloglo:latest
        ports:
        - containerPort: 8080
        env:
        - name: GEMINI_API_KEY
          value: "your_api_key_here"
---
apiVersion: v1
kind: Service
metadata:
  name: styloglo-service
spec:
  type: LoadBalancer
  ports:
  - port: 80
    targetPort: 8080
  selector:
    app: styloglo
```

#### Step 3: Deploy to GKE
```bash
kubectl apply -f k8s-deployment.yaml
```

---

## 🧪 Local Testing

Before deploying, test the Docker build locally:

```bash
# Build the Docker image
docker build -t styloglo:test .

# Run the container
docker run -p 8080:8080 styloglo:test

# Test in browser
open http://localhost:8080

# Test health endpoint
curl http://localhost:8080/health
```

---

## 🔐 Environment Variables

### For Cloud Run:
```bash
gcloud run services update styloglo \
  --update-env-vars GEMINI_API_KEY=your_key \
  --region us-central1
```

### For App Engine:
Add to `app.yaml`:
```yaml
env_variables:
  GEMINI_API_KEY: "your_key"
```

### For GKE:
Use Kubernetes Secrets:
```bash
kubectl create secret generic styloglo-secrets \
  --from-literal=GEMINI_API_KEY=your_key
```

---

## 📊 Monitoring and Logs

### View Logs (Cloud Run):
```bash
gcloud run services logs read styloglo --region us-central1
```

### View Logs (App Engine):
```bash
gcloud app logs tail -s default
```

### View Metrics:
```bash
# Open Cloud Console
gcloud console
```

---

## 🔄 Update Deployment

### Cloud Run:
```bash
# Redeploy with latest changes
gcloud run deploy styloglo --source . --region us-central1
```

### App Engine:
```bash
gcloud app deploy
```

---

## 💰 Cost Optimization

### Cloud Run (Pay per use):
- **Free tier**: 2 million requests/month
- **Pricing**: ~$0.40 per million requests
- **Recommended for**: Low to medium traffic

### App Engine Flexible:
- **Pricing**: ~$0.05/hour per instance
- **Recommended for**: Consistent traffic

### Cost-saving tips:
1. Set `--min-instances 0` for Cloud Run
2. Use `--memory 512Mi` instead of default 1Gi
3. Enable autoscaling
4. Set up budget alerts

---

## 🐛 Troubleshooting

### Build Fails:
```bash
# Check build logs
gcloud builds list
gcloud builds log BUILD_ID
```

### Container Crashes:
```bash
# Check container logs
gcloud run services logs read styloglo --limit 50
```

### Port Issues:
- Ensure Nginx listens on port 8080
- Cloud Run requires port 8080 by default

### Environment Variables Not Working:
```bash
# Verify env vars are set
gcloud run services describe styloglo --region us-central1
```

---

## 📝 Quick Reference

### Deploy Command (Cloud Run):
```bash
gcloud run deploy styloglo \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

### Update Environment Variables:
```bash
gcloud run services update styloglo \
  --update-env-vars KEY=VALUE \
  --region us-central1
```

### View Service URL:
```bash
gcloud run services describe styloglo \
  --region us-central1 \
  --format 'value(status.url)'
```

### Delete Service:
```bash
gcloud run services delete styloglo --region us-central1
```

---

## 🎯 Next Steps After Deployment

1. **Custom Domain**: 
   ```bash
   gcloud run domain-mappings create \
     --service styloglo \
     --domain yourdomain.com
   ```

2. **SSL Certificate**: Automatically provisioned by Cloud Run

3. **CDN**: Enable Cloud CDN for static assets

4. **Monitoring**: Set up Cloud Monitoring alerts

5. **CI/CD**: Set up GitHub Actions or Cloud Build triggers

---

## 📞 Support

- **Google Cloud Documentation**: https://cloud.google.com/run/docs
- **Cloud Run Pricing**: https://cloud.google.com/run/pricing
- **Support**: https://cloud.google.com/support

---

**Your StyloGlo app is ready to deploy to Google Cloud!** 🚀

Choose Cloud Run for the easiest and most cost-effective deployment.
