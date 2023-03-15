export const project = {
  Backend: [
    {
      title: "Node JS Servers",
      pills: ["nest.js", "express.js", "typescript"],
      content: (
        <div>
          <p>
            Using <b>Jest</b> as testing framework that describes the
            application business logic and enable TDD.
          </p>
          <p>
            Event-driven application design to enable modular business rule on
            each endpoint
          </p>
          <p>
            Route pattern matching to transform legacy endpoints response for
            backward compatibility feature
          </p>
          <p>Projects related to backend development:</p>
          <ul>
            <li>User generated module</li>
            <li>Microservices: Comment service, Feed service</li>
            <li>Worker applications</li>
          </ul>
          <a href="https://github.com/ye-yu/ts-sample-express">
            Sample NodeJS Backend Project
          </a>
        </div>
      ),
    },
    {
      title: "Chatbot",
      pills: ["typescript"],
      content: (
        <div>
          <p>
            Using npm package <code>node-nlp</code> to perform keyword entity
            extraction and basic neural network to respond to user free text.
            Application design is perfect for frequently asked questions and
            business flows that is keyword-sensitive.
          </p>
          <p>Optimisations include:</p>
          <ul>
            <li>text filtering with synonyms dictionaries</li>
            <li>action-object groupings</li>
          </ul>
        </div>
      ),
    },
    {
      title: "Golang with Gin",
      pills: ["golang", "gin"],
      content: (
        <div>
          <p>
            Applying graceful shutdown on Golang using channels and
            event-emitters
          </p>
          <p>
            Custom error class with stack trace generation for a more familiar
            debugging
          </p>
          <p>Custom modules includes:</p>
          <ul>
            <li>Integration with Bugsnag with panic handling</li>
            <li>
              Using generics to reuse codes and utilities in structs and
              interfaces
            </li>
            <li>Unit + E2E testing</li>
          </ul>
        </div>
      ),
    },
  ],
  Cloud: [
    {
      title: "Docker",
      pills: ["VM", "saas"],
      content: (
        <div>
          <p>Building using base packages in public repo</p>
          <p>Build optimisation by utilising multi-stage building</p>
        </div>
      ),
    },
    {
      title: "Cloud Platforms",
      pills: ["GCP", "AWS"],
      content: (
        <div>
          <p>AWS: Provisioning EC2 for VM instances.</p>
          <p>
            AWS: Fargate with Dockerised image for scalable service cluster.
          </p>
          <p>AWS: S3 & Cloudfront & Route53 for static webpages hosting.</p>
          <p>
            GCP - Google transcoder API: dispatch jobs and save compressed
            videos
          </p>
          <p>
            GCP - Google storage: Presigned URL upload with extension headers
          </p>
        </div>
      ),
    },
    {
      title: "Others",
      pills: ["DNS", "Nginx"],
      content: (
        <div>
          <p>Generate certs for HTTPS using Let's Encrypt.</p>
          <p>
            Configuring DNS for email forwarding and linking domain name with IP
            (using Dynadot and OVH Cloud technology).
          </p>
          <p>
            Web server configuration with Nginx: SSL configuration with the
            latest TLS1.2, rate limiting, load balancing, etc.
          </p>
        </div>
      ),
    },
  ],
  Data: [
    {
      title: "Databases",
      pills: ["mysql", "mongodb"],
      content: (
        <div>
          <p>
            Using MySQL database as a general purpose storage to store
            operational data. For example
          </p>
          <ul>
            <li>Chatbot knowledge versioning on MySQL JSON column</li>
            <li>
              Integration with NestJS + Prisma + Apollo GraphQL to allow quick
              definitions for immediate frontend data controls
            </li>
          </ul>
          <p>
            Using MongoDB as a robust read-only storage to allow minimal db
            operations and immediate fetching of documents to be served
            immediately.
          </p>
        </div>
      ),
    },
    {
      title: "Data Streaming",
      pills: ["kafka"],
      content: (
        <div>
          <p>
            Using kafka to transfer data internally and allow same data to be
            consumeable by multiple services
          </p>
          <p>
            Debugging by using data retent in Confluent to replay and reproduce
            error in data consumers.
          </p>
          <p>
            Using kafka as a data duplicator to prepare for microservice
            migration.
          </p>
        </div>
      ),
    },
    {
      title: "Image Analysis",
      pills: ["python", "tensorflow"],
      content: (
        <div>
          <p>
            Using KNN to{" "}
            <a
              href="https://ye-yu.github.io/portfolio//post.html?id=33f3bcc44304996e65a748352c78baaa"
              target="_blank"
              rel="noreferrer"
            >
              preprocess image dataset
            </a>{" "}
            that has a very similar feature.
          </p>
          <p>
            CNN model exploration to find the fit model for classification with{" "}
            <a
              href="https://ye-yu.github.io/portfolio/post.html?id=a172c78dabdb530834996a5c277c5ee0"
              target="_blank"
              rel="noreferrer"
            >
              satelite images
            </a>
            .
          </p>
        </div>
      ),
    },
  ],
};
