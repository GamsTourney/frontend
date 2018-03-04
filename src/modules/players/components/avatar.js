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
    const { player, size, winner } = this.props

    if (!player || !player.steam) {
      return null
    }

    const avatarKey = `avatar${SIZES[size]}`
    const src = player.steam[avatarKey]
    const className = winner ? 'avatar-winner' : ''

    return (
      <Image
        src={src}
        className={className}
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
