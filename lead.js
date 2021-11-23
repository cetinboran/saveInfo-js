const saveBtn = document.getElementById("save-btn");
const deleteBtn = document.getElementById("delete-btn");
const getTabBtn = document.getElementById("tab-btn");
const inputEl = document.getElementById("inputArea");
const leadsText = document.getElementById("leads-text");

let leads = [];

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("leads"));
if(leadsFromLocalStorage){
    leads = leadsFromLocalStorage;
    renderLeads();
}

saveBtn.addEventListener("click", function(){
    // arraye atama ve textareayı temizleme
    let value = inputEl.value;
    leads.push(value);
    inputEl.value = "";

    localStorage.setItem("leads", JSON.stringify(leads));
    renderLeads();
    //console.log(leads)
});

getTabBtn.addEventListener("click", function(){
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs){
        leads.push(tabs[0].url);
        localStorage.setItem("leads", JSON.stringify(leads));
        renderLeads();
    });
});

deleteBtn.addEventListener("dblclick", function(){
    leads = [];
    localStorage.clear();
    renderLeads();
});


function renderLeads(){
    let lead = "";
    for(let i = 0; i < leads.length; i++){
        lead +=
        `<li>
            <a target='_blank' href='${leads[i]}'>
            ${leads[i]} 
            </a>
        </li> 
        `;
    }
    leadsText.innerHTML = lead;
    //leads = [];
}
