import { ReactSVG } from "react-svg"
import { addSvgClickListener} from "./dom_helper"
import { memo } from "react"
import { Flex } from 'antd';
import { PartInfo } from "../add_injury_drawer"

// This function syncs react injury list and svg body injury
function domClassToggler(reactPartList: PartInfo[], svg: SVGSVGElement){
  reactPartList.forEach((part)=> {
    const parts = svg.querySelectorAll(part.label)
    for(let part of parts){
      const isSelected = part.classList.contains("selected")
      if (!isSelected) {
          part.classList.add("selected")
          continue
      }
      part.classList.remove("selected")
  }
  })
}
const Body = memo(({ handleCallback, addedPartList }: { handleCallback: Function, addedPartList: PartInfo[]}) => {


  return (
    <Flex style={{flexWrap: "wrap", width: "100%"}}>
        <ReactSVG
            src={"/static/front_body.svg"}
            beforeInjection={(svg) => {
              domClassToggler(addedPartList, svg)    
              addSvgClickListener(svg, handleCallback)
            }}
          
          />
        <ReactSVG 
          src={"/static/back_body.svg"}
          beforeInjection={(svg: SVGSVGElement) => {
            domClassToggler(addedPartList, svg)
            addSvgClickListener(svg, handleCallback)
          }}
        />
    </Flex>
  )
});

export default Body;