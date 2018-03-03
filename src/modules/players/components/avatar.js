import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { Image } from 'react-bootstrap'

const SIZES = {
  small: '',
  medium: 'medium',
  large: 'full'
}

class PlayerAvatar extends PureComponent {

  render() {
    const { player, size } = this.props

    if (!player || !player.steam) {
      return null
    }

    const avatarKey = `avatar${SIZES[size]}`
    const src = player.steam[avatarKey]

    return (
      <Image
        src={src}
        {...this.props}
      />
    )
  }
}

PlayerAvatar.propTypes = {
  player: PropTypes.object,
  size: PropTypes.string
}

PlayerAvatar.defaultProps = {
  player: null,
  size: 'large'
}

export default PlayerAvatar
