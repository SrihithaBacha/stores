var Stores = [
   
];
var add_id=1;
function loadData() {
    let storedData = localStorage.getItem('stores');
    
    if (storedData) {
        return JSON.parse(storedData);
    } else {
        localStorage.setItem('Stores', JSON.stringify(Stores));
        return Stores;
    }
}
function renderData() {
    var data = loadData();
    
    var container = document.getElementById('Table');
    container.innerHTML=` <div class="headings">
    <span class="cell">ID</span>
    <span class="cell">Name</span>
    <span class="cell">Location</span>
    <span class="cell">Contact_Number</span>
    <span class="cell">Opening_hours</span>
    <span class="cell">Website</span>
    <span class="cell">Created_At</span>
    <span class="cell">Updated_At</span>
    <span class="cell">OPS</span>
</div>`;
    data.forEach((store, index) => {
        var row = document.createElement('div');
        row.className = 'row';
        
        if (index % 2 === 0) {
            row.style.backgroundColor = '#fafad2'; 
        }
        else{
            row.style.backgroundColor = '#d4f8d4';
        }
        
        Object.values(store).forEach(details => {
            var cell = document.createElement('span');
            cell.className = 'cell';
            cell.textContent = details;
            row.appendChild(cell);
        });
        var buttons=document.createElement('span');
        buttons.className=`cell`;
        buttons.id=`${store.id}`;
        buttons.innerHTML=`<button class="edit" onclick="editVisible(${store.id});" type="button" id=>Edit</button><button class="deleteB" onclick="deleteStore(${store.id});"type="button" id=>Del</button>`;
        row.appendChild(buttons);
        
        container.appendChild(row);
    });
}
function addStoreVisible() {
    document.getElementById('store_details').style.display="block";
    document.getElementById('Name').value='';
    document.getElementById('Location').value='';
    document.getElementById('Contact').value='';
    document.getElementById('OpeningHrs').value='';
    document.getElementById('Website').value='';
}
function add() {
    let add_name=document.getElementById('Name').value;
    let add_location=document.getElementById('Location').value;
    let add_Contact=document.getElementById('Contact').value;
    let add_OpeningHrs=document.getElementById('OpeningHrs').value;
    let add_Website=document.getElementById('Website').value;
    let valid=validate(add_name,add_location,add_Contact);
    const date=new Date();
    let add_date=`${date.getDate()}/${date.getMonth()}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    if(valid){
        Stores.push({ id: add_id, name: add_name, location: add_location, contact: add_Contact, openingHrs: add_OpeningHrs, website: add_Website, created_at: add_date, updated_at: add_date });
        add_id++;
        document.getElementById('store_details').style.display = "none";
        renderData();
    }else{
        addStoreVisible();
    }
}
var toBeEditted;
function editVisible(eid) {
    document.getElementById('Edit_store_details').style.display="block";
    Stores.forEach((store) => {
        if(store.id == eid){
            document.getElementById('EName').value = store.name;
            document.getElementById('ELocation').value = store.location;
            document.getElementById('EContact').value = store.contact;
            document.getElementById('EOpeningHrs').value = store.openingHrs;
            document.getElementById('EWebsite').value = store.website;
            toBeEditted=store.id;
        }
    });
}

function edit() {
    Stores.forEach((store) => {
        if(store.id == toBeEditted){
            let edit_name=document.getElementById('EName').value;
            let edit_location=document.getElementById('ELocation').value;
            let edit_Contact=document.getElementById('EContact').value;
            let edit_OpeningHrs=document.getElementById('EOpeningHrs').value;
            let edit_Website=document.getElementById('EWebsite').value;
            let valid=validate(edit_name,edit_location,edit_Contact);
            let date=new Date();
            let edit_date=`${date.getDate()}/${date.getMonth()}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
            if(valid){
                let ind=Stores.indexOf(store);
                Stores.splice(ind,1,{id:store.id , name:edit_name, location: edit_location, contact: edit_Contact, openingHrs:edit_OpeningHrs,website:edit_Website,created_at : store.created_at,updated_at : edit_date });
            }
        }
    });
    document.getElementById('Edit_store_details').style.display="none";
    renderData();

}
function deleteStore(did) {
    Stores.forEach((store) => {
        if(store.id == did){
            let toBeDeleted=Stores.indexOf(store);
            Stores.splice(toBeDeleted,1);
            add_id--;
        }
    });
    renderData();
}

function validate(name, location, Contact) {
    const nrex = /^[A-Za-z]+$/;
    const phonerex = /^\d{10}$/;

    if (nrex.test(name) && nrex.test(location) && phonerex.test(Contact)) {
        alert("Successfull");
        return true;
    }
    else {
        alert("Invalid input data...please check again");
    }
}

window.onload = renderData;