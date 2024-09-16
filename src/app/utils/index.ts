
// .chest.left => Chest Left
export function labelToReadable(str: string){
    return str.split(".")
    .filter((char)=> char)
    .map((char)=> char[0].toLocaleUpperCase() + char.slice(1, char.length))
    .join(" ")
  }
  