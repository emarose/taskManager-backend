const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    titulo: { type: String, required: true },
    descripcion: { type: String, required: true },
    numeroJira: String,
    numeroRedmine: String,
    linkJira: String,
    linkRedmine: String,
    fechaEntregaEstimada: Date,
    tipoTarea: String,
    estado: String,
    tema: String,
    enEjecucion: {
      archivos: [String],
      rama: String,
    },
    pendientePR: {
      motivoPendiente: String,
    },
    toDeploy: {
      PR: String,
      fecha: Date,
    },
    enTesting: {
      fecha: Date,
      tester: String,
    },
    paraRefixing: {
      motivoRefix: String,
      posibleSolucion: String,
    },
    ejecutandoRefixing: {
      rama: String,
    },
    bloqueada: {
      fecha: Date,
      motivo: String,
    },
    completado: {
      fecha: Date,
      prLink: String,
      resumenDesarrollo: String,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
