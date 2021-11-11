<%@ page import="beans.EntryBean" %>
<%@ page contentType="text/html;charset=UTF-8" %>
<jsp:useBean id="tableRows" class="beans.EntryBeansContainer" scope="session"/>

<html lang="en-En">

<head>
    <meta charset="UTF-8">
    <link rel="icon" href="img/favicon.png">
    <link rel="stylesheet" href="css/stylesheet.css">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200;300&display=swap" rel="stylesheet">
    <title>Lab2</title>
</head>


<body>

<div id="main-container">

    <div id="head-area" class="coloured-block floating-areas">
        <span class="left-aligned">Dvorianchikova Daria, P3233</span>
        <span class="right-aligned">Variant 33386</span>
    </div>


    <div id="left-area" class="floating-areas">

        <div id="graph-block" class="content-plate">
            <div id="graph-heading" class="coloured-block">
                <span>Area</span>
            </div>
            <div id="image-container">
                <svg id="graph-svg" width="300" height="240" class="svg-graph" xmlns="http://www.w3.org/2000/svg">
                    <line class="axis" x1="0" x2="300" y1="120" y2="120" stroke="black"></line>
                    <line class="axis" x1="150" x2="150" y1="0" y2="300" stroke="black"></line>
                    <polygon points="150,0 144,15 156,15" stroke="black"></polygon>
                    <polygon points="300,120 285,126 285,114" stroke="black"></polygon>

                    <line class="coor-line" x1="200" x2="200" y1="115" y2="125" stroke="black"></line>
                    <line class="coor-line" x1="250" x2="250" y1="115" y2="125" stroke="black"></line>

                    <line class="coor-line" x1="50" x2="50" y1="115" y2="125" stroke="black"></line>
                    <line class="coor-line" x1="100" x2="100" y1="115" y2="125" stroke="black"></line>

                    <line class="coor-line" x1="145" x2="155" y1="20" y2="20" stroke="black"></line>
                    <line class="coor-line" x1="145" x2="155" y1="70" y2="70" stroke="black"></line>

                    <line class="coor-line" x1="145" x2="155" y1="170" y2="170" stroke="black"></line>
                    <line class="coor-line" x1="145" x2="155" y1="220" y2="220" stroke="black"></line>

                    <text class="coor-text" x="195" y="140">R/2</text>
                    <text class="coor-text" x="248" y="140">R</text>

                    <text class="coor-text" x="40" y="140">-R</text>
                    <text class="coor-text" x="90" y="140">-R/2</text>

                    <text class="coor-text" x="160" y="75">R/2</text>
                    <text class="coor-text" x="160" y="25">R</text>

                    <text class="coor-text" x="160" y="175">-R/2</text>
                    <text class="coor-text" x="160" y="225">-R</text>

                    <polygon class="svg-figure rectangle" points="150,120 150,70 50,70, 50,120" fill="#ebe5d5" fill-opacity="0.5" stroke="#4E4E4EEB"></polygon>

                    <path class="svg-figure circle" d="M 200 120 A 50 50 0 0 1 150 170 V 120 H 50" fill="#ebe5d5" fill-opacity="0.5" stroke="#4E4E4EEB"></path>

                    <polygon class="svg-figure triangle" points="250,120 150,120 150,20" fill="#ebe5d5" fill-opacity="0.5" stroke="#4E4E4EEB"></polygon>

                    <circle r="0" cx="150" cy="120" id="dot" fill="#866fd7"></circle>

                    <%
                        String cx;
                        String cy;
                        String fill;
                        double r = (session.getAttribute("r") == null) ? 1 : Double.parseDouble((String) session.getAttribute("r"));
                        for (EntryBean entryBean : tableRows.getEntryBeansContainer()) {
                            cx = String.valueOf(150 + Math.round(entryBean.getX() * 100 / r));
                            cy = String.valueOf(120 - Math.round(entryBean.getY() * 100 / r));
                            fill = (r == entryBean.getR()) ? "#6A00FFCE" : "#3a3e00";
                    %>

                    <circle r="3" cx=<%=cx%> cy=<%=cy%> class="prev-dot" fill=<%=fill%>></circle>

                    <%}%>
                </svg>
            </div>
        </div>


        <div id="form-block" class="content-plate">

            <div id="form-heading" class="coloured-block">
                <span>Form</span>

            </div>

            <form id="values-form" action="" method="GET">

                <div id="x-block">
                    <div id="xlabel" class="form-labels">
                        <label for="x-input">X</label>
                    </div>
                    <div id="xvalue" class="input-areas">
                        <input type="text" id="x-input" name="x" autocomplete="off" maxlength="10"
                               placeholder="Number from -5 to 3">
                    </div>
                </div>

                <div id="y-block">
                    <div id="ylabel" class="form-labels">
                        <label>Y</label>
                    </div>
                    <div id="yradio" class="input-areas">
                        <input type="radio" id="y-3" name="y" value="-3">
                        <label for="y-3">-3</label>

                        <input type="radio" id="y-2" name="y" value="-2">
                        <label for="y-2">-2</label>

                        <input type="radio" id="y-1" name="y" value="-1">
                        <label for="y-1">-1</label>

                        <input type="radio" id="y0" name="y" value="0">
                        <label for="y0">0</label>

                        <input type="radio" id="y1" name="y" value="1">
                        <label for="y1">1</label>

                        <input type="radio" id="y2" name="y" value="2">
                        <label for="y2">2</label>

                        <input type="radio" id="y3" name="y" value="3">
                        <label for="y3">3</label>

                        <input type="radio" id="y4" name="y" value="4">
                        <label for="y4">4</label>

                        <input type="radio" id="y5" name="y" value="5">
                        <label for="y5">5</label>

                        <input type="hidden" id="graph-y" name="graphY" value="">

                    </div>
                </div>


                <div id="r-block">
                    <div id="rlabel" class="form-labels">
                        <label for="r-options">R</label>
                    </div>
                    <div id="rselection" class="input-areas">
                        <select id="r-options" name="r" size="1" required>

                            <%
                                String[] options = (String[]) session.getAttribute("options");
                                if (options == null) {
                                    options = new String[]{"1", "2", "3", "4", "5"};
                                    session.setAttribute("options", options);
                                }
                                String sessionR = (String) session.getAttribute("r");
                                for (String option : options) { %>

                            <option <%=(option.equals(sessionR) ? "selected" : "")%>><%=option%>
                            </option>

                            <% }%>
                        </select>
                    </div>
                </div>

                <div class="invisible">
                    <input class="clear_info" type="hidden" name="clear" value="false">
                    <input class="graph_point_info" type="hidden" name="graph" value="false">
                </div>

                <div id="main-button-block">
                    <button class="main-button submit" type="submit" form="values-form">Submit</button>
                    <button class="main-button reset" type="reset" form="values-form">Reset</button>
                </div>

            </form>

        </div>


        <div id="message-block" class="content-plate">
            <span id="info-span"></span>
        </div>

    </div>

    <div id="right-area" class="floating-areas content-plate">
        <div id="table-heading" class="coloured-block">
            <span>Table</span>
        </div>

        <div id="table-scroll-container">
            <table id="result-table">
                <thead>
                <tr id="table-header">
                    <th class="coords-col">X</th>
                    <th class="coords-col">Y</th>
                    <th class="coords-col">R</th>
                    <th class="time-col">Current time</th>
                    <th class="time-col">Execution time</th>
                    <th class="hitres-col">Hit result</th>
                </tr>
                </thead>
                <% for (EntryBean entryBean : tableRows.getEntryBeansContainer()) { %>
                <tr>
                    <td><%= entryBean.getX()%>
                    </td>
                    <td><%= entryBean.getY()%>
                    </td>
                    <td><%= entryBean.getR()%>
                    </td>
                    <td><%= entryBean.getCurrentTime()%>
                    </td>
                    <td><%= entryBean.getExecTime()%>
                    </td>
                    <td><%= entryBean.isHit()%>
                    </td>
                </tr>
                <%}%>

            </table>
        </div>

    </div>
</div>
</body>
<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script src="js/script.js"></script>
</html>
