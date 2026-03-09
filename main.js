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
class="card bg-base-100 shadow-md p-5 hover:shadow-lg transition border-t-4
${issue.status==="open" ? "border-green-500" : "border-purple-500"}">

<!-- Top Section -->

<div class="flex justify-between items-center mb-2">

<div class="flex items-center gap-2">

<div class="w-6 h-6 flex items-center justify-center">
<img class="w-6 h-6" src="./assets/Open-Status.png" alt="">
</div>

</div>

<span class="px-3 py-1 text-xs font-semibold rounded-full
${issue.priority==="high"?"bg-red-100 text-red-500":
issue.priority==="medium"?"bg-yellow-100 text-yellow-600":
"bg-gray-200 text-[#64748B]"}">

${issue.priority.toUpperCase()}

</span>

</div>

<h2 class="font-bold text-lg leading-tight">
${issue.title}
</h2>

<p class="text-sm text-[#64748B] mt-2">
${issue.description.slice(0,80)}...
</p>

<div class="flex gap-2 mt-4">

<span class="px-3 py-1 text-xs rounded-full bg-red-100 text-red-500">
BUG
</span>

<span class="px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-600">
${issue.label ? issue.label : "HELP WANTED"}
</span>

</div>

<div class="text-sm text-gray-400 mt-4">

<p>#${issue.id} by ${issue.author}</p>

<p>${new Date(issue.createdAt).toLocaleDateString("en-US")}</p>

</div>

</div>

`;

container.appendChild(div);

});

}


// Tab Filter

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