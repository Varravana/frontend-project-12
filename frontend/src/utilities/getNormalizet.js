const getNormalizedChanals = (data) => {
const result = {}

for (let i =0; i<data.length; i +=1){
    result[data[i].id] = data[i]
}
console.log(result)
return result
}
export default getNormalizedChanals