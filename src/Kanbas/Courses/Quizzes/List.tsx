import React, { useState, useEffect } from "react";
import { FaEllipsisV, FaCheckCircle, FaPlusCircle } from "react-icons/fa";
import { useParams } from "react-router";
import * as client from "./client";
import { Module } from "./client";

function ModuleList() {
  const { courseId } = useParams();
  const [modules, setModules] = useState<Module[]>([]);
  const [module, setModule] = useState<Module>({
    _id: "", name: "Module Name", description: "Module Description", course: ""
  });
  const [selectedModule, setSelectedModule] = useState<Module>({
    _id: "", name: "", description: "", course: ""
  });
  const fetchModules = async () => {
    const modules = await client.findAllModules(courseId);
    setModules(modules);
  }
  useEffect(() => { fetchModules(); }, []);
  const createModule = async () => {
    try {
      const newModule = await client.createModule(courseId, module);
      setModules([newModule, ...modules]);
    } catch (err) {
      console.log(err);
    }
  }
  const deleteModule = async (module: Module) => {
    try {
      await client.deleteModule(module._id);
      setModules(modules.filter((m) => m._id !== module._id));
    } catch (err) {
      console.log(err);
    }
  };
  const updateModule = async () => {
    if (module._id) {
      await client.updateModule(module);
      setModules(modules.map((m) => m._id === module._id ? m = module : m))
    }
  }

  return (
    <>
    <div>
      <div className="buttons">
      <button className="btn btn-secondary">Collapse All</button>
        <button className="btn btn-secondary">View Progress</button>
        <button className="btn btn-secondary"><span className="text-success"><FaCheckCircle/></span> Publish All</button>
        <button className="btn btn-danger">+ Module</button>
        <button className="btn btn-secondary"><FaEllipsisV/> </button>
      </div><hr/>
      <ul className="list-group wd-modules">
      <li className="list-group-item">
        <div className="form-group">
          <div className="buttons">
            <button className="btn btn-success" onClick={createModule}>
              Add
            </button>
            <button className="btn btn-warning" onClick={updateModule}>
              Update
            </button>
          </div>
          <input className="form-control"
            value={module.name} placeholder="Module name"
            onChange={(e) =>
              setModule({ ...module, name: e.target.value })
            }/>
          <textarea className="form-control"
            value={module.description} placeholder="Module description"
            onChange={(e) =>
              setModule({ ...module, description: e.target.value })
            }/>
        </div>
      </li>
        {modules
        .filter((module:any) => module.course === courseId)
        .map((module:any, index) => (
          <li key={index} className="list-group-item" onClick={() => setSelectedModule(module)}>
            <div>
              <div className="buttons">
                <button className="btn btn-warning" onClick={() => setModule(module)}>
                  Edit
                </button>
                  <button className="btn btn-danger" onClick={() => deleteModule(module)}>
                  Delete
                </button><br/>
              </div>
              <FaEllipsisV className="me-2" />
              {module.name}
              <span className="float-end">
                <FaCheckCircle className="text-success" />
                <FaPlusCircle className="ms-2" />
                <FaEllipsisV className="ms-2" />
              </span>
            </div>
            {selectedModule?._id === module._id && (
              <ul className="list-group">
                {module.lessons?.map((lesson: { name: string }) => (
                  <li className="list-group-item">
                    <FaEllipsisV className="me-2" />
                    {lesson.name}
                    <span className="float-end">
                      <FaCheckCircle className="text-success" />
                      <FaEllipsisV className="ms-2" />
                    </span>
                  </li>
                ))}
              </ul>
                )}
          </li>
        ))}
      </ul>
    </div>
    </>
  );
}
export default ModuleList;