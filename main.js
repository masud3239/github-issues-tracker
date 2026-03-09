const container=document.getElementById("issuesContainer");
const spinner=document.getElementById("spinner");

let allIssues=[];


//  Load all issues

async function loadIssues(){

spinner.classList.remove("hidden");

const res=await fetch(
"https://phi-lab-server.vercel.app/api/v1/lab/issues"
);

const data=await res.json();

allIssues=data.data;

displayIssues(allIssues);

spinner.classList.add("hidden");

document.getElementById("issueCount").innerText=
allIssues.length+" Issues";

}


//  Display issues

function displayIssues(issues){

container.innerHTML="";

document.getElementById("issueCount").innerText=
issues.length+" Issues";

issues.forEach(issue=>{

const div=document.createElement("div");

div.innerHTML=`

<div onclick="openModal(${issue.id})"
class="card bg-base-100 shadow border-t-4
${issue.status==="open"?"border-green-500":"border-purple-500"}">

<div class="card-body">

<h2 class="card-title">
${issue.title}
</h2>

<p>
${issue.description.slice(0,80)}...
</p>

<div class="flex gap-2">

<span class="badge badge-success">
${issue.status}
</span>

<span class="badge badge-info">
${issue.priority}
</span>

<span class="badge badge-warning">
${issue.label}
</span>

</div>

<p class="text-sm text-[#64748B]">
Author: ${issue.author}
</p>

<p class="text-xs text-[#64748B]">
${issue.createdAt}
</p>

</div>

</div>

`;

container.appendChild(div);

});

}


// TAB FILTER

function filterTab(type,btn){

document.querySelectorAll(".tab")
.forEach(t=>t.classList.remove("tab-active"));

btn.classList.add("tab-active");

if(type==="all")
displayIssues(allIssues);

if(type==="open")
displayIssues(allIssues.filter(i=>i.status==="open"));

if(type==="closed")
displayIssues(allIssues.filter(i=>i.status==="closed"));

}


// Open Modal

async function openModal(id){

const res = await fetch(
`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`
);

const data = await res.json();

const issue = data.data;


// Title

document.getElementById("modalTitle").innerText =
issue.title;


// Description

document.getElementById("modalDescription").innerText =
issue.description;


// Author

document.getElementById("modalAuthor").innerText =
issue.author;


// Date

document.getElementById("modalDate").innerText =
issue.createdAt;


// Label

document.getElementById("modalLabel").innerText =
issue.label;


// Priority

document.getElementById("modalPriority").innerText =
issue.priority;


// Assignee

document.getElementById("modalAssignee").innerText =
issue.author;


// Status 

const status = document.getElementById("modalStatus");

status.innerText = issue.status;

if(issue.status === "open"){
status.className = "badge badge-success";
}else{
status.className = "badge badge-secondary";
}


// Open Modal

document.getElementById("issueModal").showModal();

}


// Search

async function searchIssues(){

const text=document.getElementById("searchInput").value;

if(text===""){
loadIssues();
return;
}

const res=await fetch(
`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`
);

const data=await res.json();

displayIssues(data.data);

}


// Initial load

loadIssues();