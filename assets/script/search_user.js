
function searchUser(){
    const param1 = encodeURIComponent(document.getElementById('serachBar').value);
    console.log(param1)

    const apiURL = `/users/filter?userName=${param1}`;

    //making API call
    fetch(apiURL)
    .then(response => response.json())
    .then((data)=>{
        console.log(data);
        const ele = document.getElementById('allUsers');
        ele.innerHTML="";
        let innerElement ="";
        data.map((user)=>{
            innerElement += 
            `
            <li class="rounded">
                <div>
                    <p><i class="fa-solid fa-user">&nbsp;</i>${user.name }</p>
                    <p><i class="fa-solid fa-envelope"></i>&nbsp;${user.email }</p>
                </div>
                <!-- strat modal -->
                <!-- Button trigger modal -->
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#${user._id}">
                    View/Update
                </button>
                
                <!-- Modal -->
                <div class="modal fade" id="${user._id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">User Details</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <form class="modal-body-form" action="/users/update/${user._id}" id="${user._id}" method="post">
                                    <div>
                                        <label for="name">Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</label>
                                        <input type="text" id="name" name="name" value="${user.name}" required>
                                    </div>
                                    <div>
                                        <label for="email">Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</label>
                                        <input type="email" id="email" name="email" value="${user.email}" required>
                                    </div>
                                    <div>
                                        <label for="isAdmin">IsAdmin&nbsp;&nbsp;&nbsp;:</label>
                                        <select name="isAdmin" id="isAdmin" required>
                                            <option value="${user.isAdmin}" selected>${user.isAdmin}</option>
                                            <option value="${!user.isAdmin}">${!user.isAdmin}</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label for="password">Password&nbsp;:</label>
                                        <input type="text" id="password" name="password" value="${user.password}" required>
                                    </div>
                                    <input type="submit" name="" id="" class="btn btn-primary" value="Update/Save">
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- end modal -->
                <a href="/users/addReview/${user._id}">
                    <button type="button" class="btn btn-primary">
                        Add Review/Update
                    </button>
                </a>
                <!-- detele modal start-->
                <!-- Button trigger modal -->
                <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#${user._id + user._id}">
                    Delete
                </button>
                
                    <!-- Modal -->
                    <div class="modal fade" id="${user._id + user._id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Delete User</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <p>Are you sure u want to delete <b>${user.name}</b></p>
                            </div>
                            <div class="modal-footer">
                            <a href="/users/delete/${user._id}"><button type="button" class="btn btn-danger" >Yes</button></a>
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">No</button>
                            </div>
                        </div>
                        </div>
                    </div>
                <!-- delete modal end -->
            </li>
            `
        })
        ele.innerHTML = innerElement;
    })
    .catch(error => console.log(error));
}