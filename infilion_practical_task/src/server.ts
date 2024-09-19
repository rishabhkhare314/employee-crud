import { createServer, Model } from "miragejs";

export function makeServer() {
  const server = createServer({
    models: {
      employee: Model,
    },

    seeds(server) {
      server.db.loadData({
        employees: [
          {
            id: 1,
            name: "Aarav",
            position: "Developer",
            age: 28,
          },
          {
            id: 2,
            name: "Vivaan",
            position: "Designer",
          },
          {
            id: 3,
            name: "Aditya",
            position: "Backend Developer",
          },
          {
            id: 4,
            name: "Sai",
            position: "Designer",
          },
          {
            id: 5,
            name: "Arjun",
            position: "Frontend Developer",
          },
          {
            id: 6,
            name: "Rohan",
            position: "UI/UX Designer",
          },
          {
            id: 7,
            name: "Karan",
            position: "Project Manager",
          },
          {
            id: 8,
            name: "Ayaan",
            position: "QA Engineer",
          },
          {
            id: 9,
            name: "Diya",
            position: "DevOps Engineer",
          },
          {
            id: 10,
            name: "Meera",
            position: "Product Manager",
          },
        ],
      });
    },

    routes() {
      this.namespace = "api";

      this.get("/employees", (schema) => {
        console.log("GET /employees API hit");
        return schema.employees.all();
      });

      this.post("/employees", (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        return schema.employees.create(attrs);
      });

      this.put("/employees/:id", (schema, request) => {
        const id = request.params.id;
        const attrs = JSON.parse(request.requestBody);
        return schema.employees.find(id)?.update(attrs);
      });

      this.delete("/employees/:id", (schema, request) => {
        const id = request.params.id;
        return schema.employees.find(id)?.destroy();
      });
    },
  });

  return server;
}
