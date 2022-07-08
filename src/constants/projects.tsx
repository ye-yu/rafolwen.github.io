export const project = {
  Backend: [
    {
      title: "Restful API",
      pills: ["express.js", "typescript"],
      content: <div>
        <p>
          Sequelize as the ORM, Redis for hot data storage, CRUD api design, Joi for schema validation.
          Using intuitive versioning and route naming to ensure long term maintainability.
        </p>
        <p>
          Projects related to backend development:
        </p>
        <ul>
          <li>User management module</li>
          <li>Microservices</li>
          <li>Worker applications</li>
        </ul>
      </div>,
    },
    {
      title: "Chatbot",
      pills: ["typescript"],
      content: <div>
        <p>
          Using npm package <code>node-nlp</code> to perform keyword entity extraction and basic neural network to
          respond to user free text. Application design is perfect for frequently asked questions and business flows
          that is keyword-sensitive.
        </p>
        <p>
          Optimisations include:
        </p>
        <ul>
          <li>
            text filtering with synonyms dictionaries
          </li>
          <li>
            action-object groupings
          </li>
        </ul>
      </div>,
    },
    {
      title: "GraphQL with Nest.js",
      pills: ["graphql", "nest.js"],
      content: <div>
        <p>
          Code-first approach with graphql + nest.js. Using prisma as db ORM.
          Honestly, I am surprised why did I not find this framework earlier in my career.
        </p>
        <p>
          Custom modules includes:
        </p>
        <ul>
          <li>Error reporter integration with decorator</li>
          <li>Input field for specific role validation</li>
          <li>Unit + E2E testing with jest</li>
        </ul>

      </div>,
    },
  ],
  Cloud: [
    {
      title: "AWS",
      pills: ["VM", "saas"],
      content: <div>
        <p>
          Provisioning EC2 for VM instances.
        </p>
        <p>
          Fargate with Dockerised image for scalable service cluster.
        </p>
        <p>
          S3 & Cloudfront & Route53 for static webpages hosting.
        </p>
      </div>,
    },
    {
      title: "Google Cloud",
      pills: ["VM", "saas"],
      content: <div>
        <p>
          Google transcoder API: dispatch jobs and save compressed videos
        </p>
        <p>
          Google storage: Presigned URL upload with extension headers
        </p>
      </div>,
    },
    {
      title: "Others",
      pills: ["DNS", "Nginx"],
      content: <div>
        <p>
          Generate certs for HTTPS using Let's Encrypt.
        </p>
        <p>
          Configuring DNS for email forwarding and linking domain name with IP (using Dynadot and OVH Cloud technology).
        </p>
        <p>
          Web server configuration with Nginx: SSL configuration with the latest TLS1.2, rate limiting, load balancing, etc.
        </p>
      </div>,
    },
  ],
  Data: [
    {
      title: "Engineering",
      pills: ["spark", "hadoop"],
      content: <div>
        <p>
          Using Spark for fast batch data preprocessing & transformation. HDFS storage configuration with Hadoop.

        </p>
      </div>,
    },
    {
      title: "Data Collection",
      pills: ["java", "kotlin"],
      content: <div>
        <p>
          Using byte buffers to periodically encode Minecraft player activities for fast quick data recording.
          Using single-threaded queue to ensure correct data collection sequence. Using Kotlin for fun.
        </p>
        <p>
        </p>
      </div>,
    },
    {
      title: "Image Analysis",
      pills: ["python", "tensorflow"],
      content: <div>
        <p>
          Using KNN to <a href="https://ye-yu.github.io/portfolio//post.html?id=33f3bcc44304996e65a748352c78baaa" target="_blank" rel="noreferrer">preprocess image dataset</a> that has a very similar feature.
        </p>
        <p>
          CNN model exploration to find the fit model for classification with <a href="https://ye-yu.github.io/portfolio//post.html?id=a172c78dabdb530834996a5c277c5ee0" target="_blank" rel="noreferrer">satelite images</a>.
        </p>
      </div>,
    },
  ],
}
