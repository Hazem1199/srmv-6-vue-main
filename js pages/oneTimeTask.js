// Correct import of Composition API functions
const { createApp, ref, reactive, onMounted } = Vue;

// Define Vue component using Composition API
const App = {
  setup() {
    // Define a reactive variable to store the message
    const state = reactive({
      oneTasks: [],
      projects: [],
      status: [],
    });

    // Fetch the projects using the token
    const fetchProjects = async () => {
      const placeholderglow = document.querySelector(".placeholder-glow");

      placeholderglow.classList.remove("d-none");
      const baseUrl = `https://srm-vbc7.onrender.com/api/projects`;
      const token =
        "f2004377863e9d767b12ed40b2a996ff71343b463323b990160adf52f660493e20e77b5f368d4f510a3f9a0ccb3bb2cbed5b8c8a6800c63d768eed032bf0eeeb030cfab84d2167ca498673aeb6528147a103989c27e944e87768be0b2b6c65f5f8ad994a831150e8bce9bbf650261d17cf5f5db8e03182ea2faec183d1ec11de";
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await fetch(baseUrl, { headers });
      const data = await response.json();
      state.projects = data.data.map((project) => ({
        name: project.attributes.name,
      }));

      console.log(state.projects);
      placeholderglow.classList.add("d-none");
    };

    // Call the fetchprojects function on component mount
    onMounted(fetchProjects);

    // Fetch the tasks using the token
    const fetchTasks = async () => {
      const placeholderglow = document.querySelector(".placeholder-glow");
      placeholderglow.classList.remove("d-none");
      const baseUrl = `https://srm-vbc7.onrender.com/api/onetasks`;
      const token =
        "f2004377863e9d767b12ed40b2a996ff71343b463323b990160adf52f660493e20e77b5f368d4f510a3f9a0ccb3bb2cbed5b8c8a6800c63d768eed032bf0eeeb030cfab84d2167ca498673aeb6528147a103989c27e944e87768be0b2b6c65f5f8ad994a831150e8bce9bbf650261d17cf5f5db8e03182ea2faec183d1ec11de";
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await fetch(baseUrl, { headers });
      const data = await response.json();
      state.oneTasks = data.data;
      console.log(state.oneTasks);
      placeholderglow.classList.add("d-none");
    };

    // Call the fetchtasks function on component mount
    onMounted(fetchTasks);

    // Function to delete a task
    // const deletetask = async (id) => {
    //   const confirmed = confirm(
    //     "Are you sure you want to delete this task? "
    //   );
    //   const deletetask = document.querySelector(".deletetask");
    //   const spinner = document.createElement("span");
    //   spinner.classList.add(
    //     "spinner-border",
    //     "spinner-border-sm",
    //     "ms-2",
    //     "d-none"
    //   );
    //   spinner.setAttribute("role", "status");
    //   spinner.setAttribute("aria-hidden", "true");
    //   deletetask.appendChild(spinner);

    //   if (confirmed) {
    //     const baseUrl = `https://srm-vbc7.onrender.com/api/tasks/${id}`;
    //     const token =
    //       "f2004377863e9d767b12ed40b2a996ff71343b463323b990160adf52f660493e20e77b5f368d4f510a3f9a0ccb3bb2cbed5b8c8a6800c63d768eed032bf0eeeb030cfab84d2167ca498673aeb6528147a103989c27e944e87768be0b2b6c65f5f8ad994a831150e8bce9bbf650261d17cf5f5db8e03182ea2faec183d1ec11de";
    //     const headers = {
    //       Authorization: `Bearer ${token}`,
    //     };
    //     const response = await fetch(baseUrl, {
    //       method: "DELETE",
    //       headers,
    //     });
    //     const deletedtask = await response.json();
    //     console.log(deletedtask);
    //     const url2 = `https://srm-vbc7.onrender.com/api/taskhistories`;

    //     const user = localStorage.getItem("myCode");

    //     await fetch(url2, {
    //       method: "POST",
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({
    //         data: {
    //           name: deletedtask.data.attributes.name,
    //           description: deletedtask.data.attributes.description,
    //           deleteby: user,
    //           status: deletedtask.data.attributes.status,
    //         },
    //       }),
    //     });

    //     await fetchtasks();
    //   }
    // };

    // // Function to create a new task

    const createTask = async () => {
      const modal = document.createElement("div");
      modal.classList.add("modal", "fade");
      modal.setAttribute("id", "taskNameModal");
      modal.setAttribute("tabindex", "-1");
      modal.setAttribute("role", "dialog");
      modal.setAttribute("aria-labelledby", "taskNameModalLabel");
      modal.setAttribute("aria-hidden", "true");

      const dialog = document.createElement("div");
      dialog.classList.add("modal-dialog", "modal-dialog-centered");

      const content = document.createElement("div");
      content.classList.add("modal-content");

      const header = document.createElement("div");
      header.classList.add("modal-header");
      header.innerHTML = `<h5 class="modal-title" id="taskNameModalLabel">Create task</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>`;

      const body = document.createElement("div");
      body.classList.add("modal-body");
      body.innerHTML = `<form>
        <div class="mb-3">
          <label class="form-label" for="taskName">Name</label>
          <input type="text" id="taskName" class="form-control" required>
        </div>
        <div class="mb-3">
          <label class="form-label" for="taskDescription">Description</label>
          <input type="text" id="taskDescription" class="form-control" required>
        </div>
        <div class="mb-3">
          <label class="form-label" for="taskProject">Project List</label>
          <select @click="populateProjectList()" id="taskProject" class="form-select" required>
            
          </select>

        </div>
        <button id="advancedButton" class="btn btn-outline-secondary btn-sm mt-3">Advanced Setting</button>
        <div class="advancedOptions d-none">
          <div class="mb-3">
            <label class="form-label" for="taskFrom">From</label>
            <input type="datetime-local" id="taskFrom" class="form-control">
          </div>
          <div class="mb-3">
            <label class="form-label" for="taskTo">To</label>
            <input type="datetime-local" id="taskTo" class="form-control">
          </div>
        </div>
      </form>`;

      const footer = document.createElement("div");
      footer.classList.add("modal-footer");
      footer.innerHTML = `<div class="d-flex justify-content-center"><div class="btn-group" role="group" aria-label="taskModalButtonGroup"> <button type="button" class="btn btn-primary" id="createButton">Create</button> </div></div>`;
      content.appendChild(header);
      content.appendChild(body);
      content.appendChild(footer);
      dialog.appendChild(content);
      modal.appendChild(dialog);

      document.body.appendChild(modal);

      const taskModal = new bootstrap.Modal(modal);
      taskModal.show();

      const user = localStorage.getItem("myCode");
      const alertMsg = document.querySelector(".alertMsg");
      const formCheck = document.querySelector(".formCheck");

      const createBtn = modal.querySelector("#createButton");
      const spinner = document.createElement("span");
      spinner.classList.add(
        "spinner-border",
        "spinner-border-sm",
        "ms-2",
        "d-none"
      );
      spinner.setAttribute("role", "status");
      spinner.setAttribute("aria-hidden", "true");
      createBtn.appendChild(spinner);

      modal
        .querySelector("#createButton")
        .addEventListener("click", async (e) => {
          e.preventDefault();
          spinner.classList.remove("d-none");

          const newName = modal.querySelector("#taskName").value;
          const newDescription = modal.querySelector("#taskDescription").value;
          const taskProject = modal.querySelector("#taskProject").value;
          // console.log(taskList);
          const taskFrom = modal.querySelector("#taskFrom").value;
          const taskTo = modal.querySelector("#taskTo").value;

          // taskStartTime.required = taskList === "Training Program";
          // taskEndTime.required = taskList === "Training Program";

          const url = `https://srm-vbc7.onrender.com/api/onetasks`;
          // const url2 = `https://srm-vbc7.onrender.com/api/taskhistories`;
          const token =
            "f2004377863e9d767b12ed40b2a996ff71343b463323b990160adf52f660493e20e77b5f368d4f510a3f9a0ccb3bb2cbed5b8c8a6800c63d768eed032bf0eeeb030cfab84d2167ca498673aeb6528147a103989c27e944e87768be0b2b6c65f5f8ad994a831150e8bce9bbf650261d17cf5f5db8e03182ea2faec183d1ec11de";

          await fetch(url, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              data: {
                name: newName,
                description: newDescription,
                emp: user,
                project: taskProject,
                // status: "open",
                // taskType: taskList,
                start: taskFrom,
                deadline: taskTo,
              },
            }),
          })
            // await fetch(url2, {
            //   method: "POST",
            //   headers: {
            //     Authorization: `Bearer ${token}`,
            //     "Content-Type": "application/json",
            //   },
            //   body: JSON.stringify({
            //     data: {
            //       name: newName,
            //       description: newDescription,
            //       createby: user,
            //       status: "open",
            //       taskType: taskList,
            //       from: taskStartTime,
            //       to: taskEndTime,
            //     },
            //   }),
            // })
            .then((result) => {
              // Handle success
              alertMsg.classList.add("alert", "alert-success");
              alertMsg.innerHTML =
                "<strong>Success!</strong> task added successfully.";
              alertMsg.style.display = "block";
              alertMsg.style.width = "25%";
              alertMsg.style.position = "fixed";
              alertMsg.style.top = "0";
              alertMsg.style.left = "38%";
              alertMsg.style.margin = "20px";
              alertMsg.style.transition = "all 0.5s ease-in-out";
              alertMsg.style.opacity = "0";
              setTimeout(function () {
                alertMsg.style.opacity = "1";
              }, 10);
              setTimeout(function () {
                alertMsg.style.display = "none";
              }, 2000);
            })
            .catch((error) => {
              // Handle error
              alertMsg.classList.add("alert", "alert-danger");
              alertMsg.style.width = "25%";
              alertMsg.style.position = "fixed";
              alertMsg.style.top = "0";
              alertMsg.style.left = "38%";
              alertMsg.style.margin = "20px";
              alertMsg.style.transition = "all 0.5s ease-in-out";
              alertMsg.innerHTML =
                "<strong>Error!</strong> An error occurred: " +
                error.message +
                ". Please try again.";
              alertMsg.style.display = "block";
              alertMsg.style.opacity = "0";
              setTimeout(function () {
                alertMsg.style.opacity = "1";
              }, 10);
              setTimeout(function () {
                alertMsg.style.display = "none";
              }, 2000);
            });

          await fetchTasks();
          taskModal.hide();
          spinner.classList.add("d-none");
        });

      // Function to toggle advanced options visibility
      function toggleAdvancedOptions(e) {
        e.preventDefault();
        let advancedOptions = modal.querySelector(".advancedOptions");
        if (advancedOptions.classList.contains("d-none")) {
          advancedOptions.classList.remove("d-none");
        } else {
          advancedOptions.classList.add("d-none");
        }
      }

      // Attach event listener for the button to toggle advanced options
      let advancedButton = modal.querySelector("#advancedButton");
      advancedButton.addEventListener("click", toggleAdvancedOptions);

      let namesarr = [];

      const populateProjectList = async () => {
        const projectSelect = modal.querySelector("#taskProject");
        projectSelect.innerHTML = `<option value="" disabled selected>Select a project</option>`;
        namesarr = state.projects.map(({ name }) => name);
        namesarr.forEach((name) => {
          const option = document.createElement("option");
          option.textContent = name;
          projectSelect.appendChild(option);
        });
        const selectedProject = sessionStorage.getItem("selectedProject");
        if (selectedProject) {
          projectSelect.value = selectedProject;
        }
        console.log(selectedProject);
      };

      populateProjectList();

      const projectNameList = async () => {
        const projectSelect = document.querySelector("#taskProject");
        projectSelect.addEventListener("change", () => {
          const selectedProject = projectSelect.value;
          sessionStorage.setItem("selectedProject", selectedProject);
          console.log(selectedProject);
        });
      };

      let taskProject = modal.querySelector("#taskProject");
      taskProject.addEventListener("click", projectNameList);
    };

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const day = date.getDate();
      const month = date.toLocaleString("default", { month: "long" });
      const year = date.getFullYear();
      return `${day} ${month}, ${year}`;
    };

    // // Function to edit a task
    // const edittask = async (taskId) => {
    //   try {
    //     const url = `https://srm-vbc7.onrender.com/api/tasks/${taskId}`;
    //     const token =
    //       "f2004377863e9d767b12ed40b2a996ff71343b463323b990160adf52f660493e20e77b5f368d4f510a3f9a0ccb3bb2cbed5b8c8a6800c63d768eed032bf0eeeb030cfab84d2167ca498673aeb6528147a103989c27e944e87768be0b2b6c65f5f8ad994a831150e8bce9bbf650261d17cf5f5db8e03182ea2faec183d1ec11de";

    //     const data = await (
    //       await fetch(url, { headers: { Authorization: `Bearer ${token}` } })
    //     ).json();

    //     const task = data.data;

    //     const modal = document.createElement("div");
    //     modal.classList.add("modal", "fade");
    //     modal.setAttribute("id", "taskNameModal");
    //     modal.setAttribute("tabindex", "-1");
    //     modal.setAttribute("role", "dialog");
    //     modal.setAttribute("aria-labelledby", "taskNameModalLabel");
    //     modal.setAttribute("aria-hidden", "true");

    //     const modalDialog = document.createElement("div");
    //     modalDialog.classList.add("modal-dialog", "modal-dialog-centered");

    //     const modalContent = document.createElement("div");
    //     modalContent.classList.add("modal-content");

    //     const modalHeader = document.createElement("div");
    //     modalHeader.classList.add("modal-header");
    //     modalHeader.innerHTML = `<h5 class="modal-title" id="taskNameModalLabel">Edit task</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>`;

    //     const modalBody = document.createElement("div");
    //     modalBody.classList.add("modal-body");
    //     modalBody.innerHTML = `<form>
    //     <label for="taskName">task name:</label><input type="text" id="taskName" class="form-control" value="${task.attributes.name}">
    //     <label for="taskDescription">task description:</label><input type="text" id="taskDescription" class="form-control" value="${task.attributes.description}">
    //     </form>`;

    //     const modalFooter = document.createElement("div");
    //     modalFooter.classList.add("modal-footer");
    //     modalFooter.innerHTML = `<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button><button type="button" class="btn btn-primary" id="updateButton">Update</button>`;

    //     modalContent.appendChild(modalHeader);
    //     modalContent.appendChild(modalBody);
    //     modalContent.appendChild(modalFooter);
    //     modalDialog.appendChild(modalContent);
    //     modal.appendChild(modalDialog);

    //     document.body.appendChild(modal);

    //     const taskNameModal = new bootstrap.Modal(modal);
    //     taskNameModal.show();
    //     const spinner = document.createElement("span");
    //     spinner.classList.add(
    //       "spinner-border",
    //       "spinner-border-sm",
    //       "ms-2",
    //       "d-none"
    //     );
    //     spinner.setAttribute("role", "status");
    //     spinner.setAttribute("aria-hidden", "true");
    //     modal.querySelector("#updateButton").appendChild(spinner);

    //     modal
    //       .querySelector("#updateButton")
    //       .addEventListener("click", async (e) => {
    //         spinner.classList.remove("d-none");
    //         e.preventDefault();
    //         const newName = modal.querySelector("#taskName").value;
    //         const newDescription = modal.querySelector(
    //           "#taskDescription"
    //         ).value;
    //         if (newName === task.attributes.name) {
    //           return;
    //         }

    //         await fetch(url, {
    //           method: "PUT",
    //           headers: {
    //             Authorization: `Bearer ${token}`,
    //             "Content-Type": "application/json",
    //           },
    //           body: JSON.stringify({
    //             data: {
    //               ...task.attributes,
    //               name: newName,
    //               description: newDescription,
    //             },
    //           }),
    //         });

    //         const url2 = `https://srm-vbc7.onrender.com/api/taskhistories`;
    //         const alertMsg = document.querySelector(".alertMsg");

    //         const user = localStorage.getItem("myCode");

    //         await fetch(url2, {
    //           method: "POST",
    //           headers: {
    //             Authorization: `Bearer ${token}`,
    //             "Content-Type": "application/json",
    //           },
    //           body: JSON.stringify({
    //             data: {
    //               name: newName,
    //               description: newDescription,
    //               editby: user,
    //             },
    //           }),
    //         })
    //           .then((result) => {
    //             // Handle success
    //             alertMsg.classList.add("alert", "alert-success");
    //             alertMsg.innerHTML =
    //               "<strong>Success!</strong> task updated successfully.";
    //             alertMsg.style.display = "block";
    //             alertMsg.style.width = "25%";
    //             alertMsg.style.position = "fixed";
    //             alertMsg.style.top = "0";
    //             alertMsg.style.left = "38%";
    //             alertMsg.style.margin = "20px";
    //             alertMsg.style.transition = "all 0.5s ease-in-out";
    //             alertMsg.style.opacity = "0";
    //             setTimeout(function () {
    //               alertMsg.style.opacity = "1";
    //             }, 10);
    //             setTimeout(function () {
    //               alertMsg.style.display = "none";
    //             }, 2000);
    //           })
    //           .catch((error) => {
    //             // Handle error
    //             alertMsg.classList.add("alert", "alert-danger");
    //             alertMsg.style.width = "25%";
    //             alertMsg.style.position = "fixed";
    //             alertMsg.style.top = "0";
    //             alertMsg.style.left = "38%";
    //             alertMsg.style.margin = "20px";
    //             alertMsg.style.transition = "all 0.5s ease-in-out";
    //             alertMsg.innerHTML =
    //               "<strong>Error!</strong> An error occurred: " +
    //               error.message +
    //               ". Please try again.";
    //             alertMsg.style.display = "block";
    //             alertMsg.style.opacity = "0";
    //             setTimeout(function () {
    //               alertMsg.style.opacity = "1";
    //             }, 10);
    //             setTimeout(function () {
    //               alertMsg.style.display = "none";
    //             }, 2000);
    //           });

    //         await fetchtasks();
    //         modal.remove();
    //         taskNameModal.hide();
    //         spinner.classList.add("d-none");
    //       });
    //   } catch (error) {
    //     alert("An error occurred while editing the task.");
    //   }
    // };

    // // Function to open or close a task

    // const changeStatus = async (id, status) => {
    //   if (status === "open") {
    //     status = "close";
    //   } else {
    //     status = "open";
    //   }
    //   console.log(status);
    //   const baseUrl = `https://srm-vbc7.onrender.com/api/tasks/${id}`;
    //   const token =
    //     "f2004377863e9d767b12ed40b2a996ff71343b463323b990160adf52f660493e20e77b5f368d4f510a3f9a0ccb3bb2cbed5b8c8a6800c63d768eed032bf0eeeb030cfab84d2167ca498673aeb6528147a103989c27e944e87768be0b2b6c65f5f8ad994a831150e8bce9bbf650261d17cf5f5db8e03182ea2faec183d1ec11de";
    //   const headers = {
    //     Authorization: `Bearer ${token}`,
    //   };
    //   const bodyData = {
    //     data: {
    //       status,
    //     },
    //   };
    //   const response = await fetch(baseUrl, {
    //     method: "PUT",
    //     headers: {
    //       ...headers,
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(bodyData),
    //   });
    //   const statetask = await response.json();
    //   console.log(statetask);
    //   const url2 = `https://srm-vbc7.onrender.com/api/taskhistories`;

    //   await fetch(url2, {
    //     method: "POST",
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       data: {
    //         name: statetask.data.attributes.name,
    //         description: statetask.data.attributes.description,
    //         editby: localStorage.getItem("myCode"),
    //         status,
    //       },
    //     }),
    //   });

    //   await fetchtasks();
    // };

    // // Function to show the task description
    // const showModal = (id, description, name) => {
    //   console.log(description);
    //   const modal = document.createElement("div");
    //   modal.classList.add("modal", "fade");
    //   modal.setAttribute("id", "taskDescriptionModal");
    //   modal.setAttribute("tabindex", "-1");
    //   modal.setAttribute("role", "dialog");
    //   modal.setAttribute("aria-labelledby", "taskDescriptionModalLabel");
    //   modal.setAttribute("aria-hidden", "true");
    //   modal.innerHTML = `
    //     <div class="modal-dialog modal-dialog-centered">
    //       <div class="modal-content">
    //         <div class="modal-header">
    //           <h5 class="modal-title" id="taskDescriptionModalLabel">${name}</h5>
    //           <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    //         </div>
    //         <div class="modal-body text-center p-4" style="width:fit-content;">
    //           ${description}
    //         </div>
    //       </div>
    //     </div>
    //   `;
    //   document.body.appendChild(modal);
    //   const taskDescriptionModal = new bootstrap.Modal(modal);
    //   taskDescriptionModal.show();
    // };

    // Return the data and functions to be used in the template
    return {
      state,
      fetchProjects,
      fetchTasks,
      createTask,
      formatDate,
    };
  },
};

// Register the component with Vue
createApp(App).mount("#app");
