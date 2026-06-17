 var studentsArr = []; 
        function loadXMLData() {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", "ex67.xml", true);
            xhr.send();         
            xhr.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    var xmlDoc = this.responseXML;
                    var x = xmlDoc.getElementsByTagName("student");
                    for (var i = 0; i < x.length; i++) {
                        studentsArr.push({
                            id: x[i].getElementsByTagName("id")[0].childNodes[0].nodeValue,
                            name: x[i].getElementsByTagName("name")[0].childNodes[0].nodeValue,
                            bday: x[i].getElementsByTagName("birthday")[0].childNodes[0].nodeValue,
                            gender: x[i].getElementsByTagName("gender")[0].childNodes[0].nodeValue
                        });
                    }
                    renderTable();
                }
            };
        }
        function renderTable() {
            var bodytable = document.getElementById("idbodytable");
            bodytable.innerHTML = "";

            for (var i = 0; i < studentsArr.length; i++) {
                var s = studentsArr[i];
                var tr = document.createElement("tr");


                tr.onclick = (function(data) {
                    return function() { 
                        document.getElementById("d_id").innerHTML = data.id;
                        document.getElementById("d_name").innerHTML = data.name;
                        document.getElementById("d_bday").innerHTML = data.bday;
                        document.getElementById("d_sex").innerHTML = data.gender;
                        document.getElementById("detailPage").style.display = "block";
                    };
                })(s);

                tr.innerHTML = "<td>"+s.id+"</td><td>"+s.name+"</td><td>"+s.bday+"</td><td>"+s.gender+"</td>";
                bodytable.appendChild(tr);
            }
        }

        var sortAsc = true;
        function sortTable(key) {
            studentsArr.sort(function(a, b) {
                var valA = a[key].toLowerCase();
                var valB = b[key].toLowerCase();
                if (valA < valB) return sortAsc ? -1 : 1;
                if (valA > valB) return sortAsc ? 1 : -1;
                return 0;
            });
            sortAsc = !sortAsc;
            renderTable();
        }