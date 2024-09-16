 
export function ToggleSelectedClass(partClass: string) {
    const parts = document.querySelectorAll(partClass)
    for(let part of parts){
        const isSelected = part.classList.contains("selected")
        if (!isSelected) {
            part.classList.add("selected")
            continue
        }
        part.classList.remove("selected")
    }
}

export function RemoveSelectedClass(bodyParts: string[]){
    bodyParts.forEach((part) => {
        const partEl = document.querySelectorAll("." + part)
        for(let part of partEl){
            const isSelected = part.classList.contains("selected")
            if (isSelected) {
                part.classList.remove("selected")
            }
        }
    })
}


export type DOMSelection = {
    partClasses: string,
    selected: Boolean
}
/**
 * add event listener to two svg body image
 * add selected or remove selected class on clicked area
 * pass: | 1. classes 2. selected status | to callback
 */
export function handleBodySelection(callback: Function){
    const svgEl = document.getElementsByTagName("svg")
    for(let el of svgEl){
        // remove listner if any
        // el.removeEventListener("click", (event: Event) => BodyClickHandler(event, callback)) 
        el.addEventListener("click", (event: Event) => BodyClickHandler(event, callback))
    }
}

const BodyClickHandler = (event: Event, callback: Function)=> {
    const elType = event.target as HTMLElement  
    if(elType){
        // INFO: this check make sure we are not selectin paths in svg that is not body part or is empty
        if(elType.classList.length > 0) {
        
            let partClasses = "" // group classes togther
            let alreadySelected = false
            for(let cls of elType.classList){
                if(cls === "selected") {
                    alreadySelected = true
                    continue
                }
                // if parts of face is selected, just color head
                // if(cls === "head"){
                //     partClasses = ""
                //     partClasses = ".head"
                //     break
                // }
                partClasses += "." + cls
            }

            // TODO: have a hash map for body parts                    
            if(partClasses === ".injected-svg") return
            let data: DOMSelection = {
                partClasses,
                selected: !alreadySelected // after clicking, it current classes get selected
            }
            callback(data)
            // ToggleSelectedClass(partClasses)
        }
    }
}

// a function to remove .selected from all the body parts
// a function that fetches which parts are selected
export function ListAllSelectedParts(){
    const svgElements = document.getElementsByTagName("svg")
    if (!svgElements.length) return

    const result = new Set()

    for (let svg of svgElements) {
        const paths = svg.querySelectorAll("path") // Get all <path> elements
        for (let path of paths) {
            let pathClass = path.getAttribute("class") // Get class attribute

            if (pathClass && pathClass.includes("selected")) {
                // Perform your logic here when the class matches your condition
                pathClass = pathClass.replace("selected", "")
                result.add(pathClass)
            }
        }
    }

    console.log(result)
}