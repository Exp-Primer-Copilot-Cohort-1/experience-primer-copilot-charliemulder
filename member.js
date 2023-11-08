function skillsMember() {
    var skills = document.getElementById("skills");
    var skill = document.getElementById("skill");
    var skillValue = skill.value;
    var skillText = document.createTextNode(skillValue);
    var skillLi = document.createElement("li");
    skillLi.appendChild(skillText);
    skills.appendChild(skillLi);
    skill.value = "";
}