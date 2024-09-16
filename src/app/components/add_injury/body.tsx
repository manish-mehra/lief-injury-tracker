import { ReactSVG } from "react-svg"
// import FrontBody from ""
// import BackBody from "../../static/back_body.svg"
import {  handleBodySelection} from "./dom_helper"
import { memo, useRef } from "react"
import { Flex } from 'antd';


const Body = memo(({ handleCallback }: { handleCallback: Function}) => {

  /* ref to remembers if event listener is already added to svgs across rerender. 
  * since this Component rerenders multiple times(unintentioanlly/intentionally triggered by parent), 
  * which add same event listener multiple times 
  * multiple event listener triggers callback multiple time
  * */
  const eventListenerAdded = useRef(false)

  // ref to keep track of both svg dom load
  const svgLoadedCount = useRef([false, false])

  // if both svgs are loaded, then and only it attach event listener
  const handleSvgInjection = (index: number) => {
    svgLoadedCount.current[index] = true
    console.info(`SVG ${svgLoadedCount.current} rendered`)

    if (svgLoadedCount.current[0] && svgLoadedCount.current[1] && !eventListenerAdded.current) {
      // Warning: might need to remove listners before adding,  in case it have
      handleBodySelection(handleCallback)
      eventListenerAdded.current = true
    }
  }

  console.log("rendered")

  return (
    <Flex style={{flexWrap: "wrap", width: "100%"}}>
        <ReactSVG
            src={"/static/front_body.svg"}
            afterInjection={()=>handleSvgInjection(0)}
          />
        <ReactSVG 
          src={"/static/back_body.svg"}
          afterInjection={()=>handleSvgInjection(1)}
        />
    </Flex>
  )
});

export default Body;