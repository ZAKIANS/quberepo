const express = require("express");
const app = express();
const userRouts = require("./routs/userRouts");
const viewRouts = require("./routs/viewRouts");
const apkRouts = require("./routs/apkRouts");
const handlebars = require("express-handlebars");
const hbr = require("handlebars");
const cors=require('cors');


app.set("view engine", "hbs");
app.engine(
  "hbs",
  handlebars({
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials",
    defaultLayout: "index",
    extname: "hbs",
  })
);
app.use(express.json());
app.use(cors({origin:true}));
app.use(express.static("public"));
app.use("/apk", apkRouts);
app.use("/user", userRouts);
app.use("/", viewRouts);
// app.use('/static', express.static(path.join(__dirname, 'public')))
// views handlers

hbr.registerHelper("createCate", function (row) {
  for (let [key, value] of Object.entries(row)) {
    console.log(key, value);
  }
  const newRow = `<tr>
<td>
${ 1} 
</td>
<td>
    ${this.category}
</td>
<td>
${this.slug}
</td>
<td class="text-right">
    <a href="addsubcategory" class="btn btn-circle btn-primary">Add SubCategory</a>
</td>
</tr>
`;
  return newRow;
});

module.exports = app;
