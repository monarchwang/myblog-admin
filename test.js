let fs = require("fs");
let temp = 132;


let arr = [];

for (let i = 1; i < temp; i++) {
	const obj = {
		icon: "/src/assets/qq/"+i + ".gif",
		value: "哈哈" + i
	};
	arr.push(obj);
}
fs.writeFileSync("./qq.json",JSON.stringify(arr));