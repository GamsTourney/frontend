import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { Image, Tooltip, OverlayTrigger } from 'react-bootstrap'

const SIZES = {
  small: '',
  medium: 'medium',
  large: 'full'
}

class PlayerAvatar extends PureComponent {

  renderTooltip() {
    const { player } = this.props

    return (
      <Tooltip id='avatar-tooltip'>{player.name}</Tooltip>
    )
  }

  render() {
    const { player, size, winner } = this.props

    if (!player || !player.steam) {
      return null
    }

    const avatarKey = `avatar${SIZES[size]}`
    const src = player.steam[avatarKey]
    const className = winner ? 'avatar-winner' : ''

    return (
      <OverlayTrigger placement='top' overlay={this.renderTooltip()} >
        <Image
          src={src}
          className={className}
          {...this.props}
        />
      </OverlayTrigger>
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
