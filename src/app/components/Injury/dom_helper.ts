
export type DOMSelection = {
    partClasses: string,
    selected: Boolean
}
/**
 * Attaches a click event listener to the provided SVG element and invokes the specified callback when the event occurs.
 * 
 * Throws an error if the provided SVG element is invalid (null or undefined).
 * 
 * @param svgEl - The SVG element to which the click event listener will be attached.
 * @param callback - A function to be invoked when the click event occurs on the SVG element. Receives the event as an argument.
 * @throws Error - Throws an error if the provided SVG element is invalid.
 */
export function addSvgClickListener(svgEl: SVGSVGElement, callback: Function) {
    if (!svgEl) {
        throw new Error("SVG element is invalid.");
    }
    svgEl.addEventListener('click', (event: Event) => BodyClickHandler(event, callback));
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