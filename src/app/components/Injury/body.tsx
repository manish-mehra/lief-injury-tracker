import { ReactSVG } from "react-svg"
import { addSvgClickListener} from "./dom_helper"
import { Flex } from 'antd';
import { Injury } from "@/app/types";
import { DrawerState } from "../injury_reports";

// This function syncs react injury list and svg body injury
function domClassToggler(reactPartList: Injury[], svg: SVGSVGElement){
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
const Body = ({ state, handleCallback, addedPartList }: { state?: DrawerState, handleCallback: Function, addedPartList: Injury[]}) => {


  return (
    <Flex style={{flexWrap: "wrap", width: "100%"}}>
        <ReactSVG
            src={"/static/front_body.svg"}
            beforeInjection={(svg) => {
              domClassToggler(addedPartList, svg)    
              state !=='view' && addSvgClickListener(svg, handleCallback)
            }}
          
          />
        <ReactSVG 
          src={"/static/back_body.svg"}
          beforeInjection={(svg: SVGSVGElement) => {
            domClassToggler(addedPartList, svg)
            state !=='view' && addSvgClickListener(svg, handleCallback)
          }}
        />
    </Flex>
  )
}

export default Body;