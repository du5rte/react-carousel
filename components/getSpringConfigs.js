export default function getSpringConfigurations(props) {
  if (props.presets) {
    if (!presets[props.presets]) {
      console.error(
        "react-carousel:",
        "Preset is not available, choose another one from:\n",
        "https://github.com/chenglou/react-motion/blob/9cb90eca20ecf56e77feb816d101a4a9110c7d70/src/presets.js"
      )
    }

    return presets[props.presets]
  } else {
    let springConfig = {
      ...props.springConfig
    }

    if (props.stiffness) springConfig.stiffness = props.stiffness
    if (props.damping) springConfig.damping = props.damping
    if (props.precision) springConfig.precision = props.precision

    return springConfig
  }
}
