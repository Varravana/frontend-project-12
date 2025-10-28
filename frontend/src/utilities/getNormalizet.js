const getNormalized = (data) => {
  const result = {}
  if (data.length !== 0){
    for (let i = 0; i < data.length; i += 1) {
      result[data[i].id] = data[i]
    }}
  return result
}
export default getNormalized
