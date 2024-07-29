
const handleGetUserReq = (req, res) => {
    let read = fs.readFileSync("./data.json", "utf-8")
    let data = JSON.parse(read);
    res.json(data);
}
module.exports = {
    handleGetUserReq
};