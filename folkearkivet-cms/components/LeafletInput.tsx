import {useState} from 'react'
import {MapContainer, Marker, Popup, TileLayer, useMapEvents} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import {uuid} from '@sanity/uuid'
import {TrashIcon, WarningFilledIcon} from '@sanity/icons'

import {LatLng, LeafletMouseEvent, PolyUtil} from 'leaflet'
import {icon} from 'leaflet'

import {
  ArrayInputInsertEvent,
  ArrayOfObjectsInputProps,
  type GeopointValue,
  Path,
  set,
} from 'sanity'
import {Box, Button, Flex} from '@sanity/ui'
import clipPolygon = PolyUtil.clipPolygon

type MapPoint = {
  _key: string
  location: GeopointValue
  title?: string
  year?: number
  detail?: string
}

const ICON = icon({
  iconUrl: 'https://folkearkivet.no/assets/images/folkearkivet_map_marker.png',
  iconSize: [32, 32],
})

export const LeafletInput = (props: ArrayOfObjectsInputProps<MapPoint>) => {
  const {value = [], onChange, readOnly, onItemOpen, onItemExpand, onItemAppend} = props

  const addPoint = ({lat, lng}: LatLng) => {
    const newKey = uuid()

    const geoPoint: GeopointValue = {
      _type: 'geopoint',
      lat,
      lng,
    }
    const newItem = {
      _key: newKey,
      location: geoPoint,
      title: '',
      year: undefined,
      detail: '',
    }
    onItemAppend(newItem)

    onItemOpen([...props.path, {_key: newKey}])
  }

  const updatePoint = (index: number, updates: Partial<MapPoint>) => {
    const current = value[index]
    if (!current) return
    const updated = {...current, ...updates}
    const next = [...value]
    next[index] = updated
    onChange(set(next))
  }

  const handleMarkerClick = (index: number) => {
    const key = value[index]._key
    if (key) {
      const fullPath: Path = [...props.path, {_key: key}]

      onItemOpen(fullPath)
    }
  }

  function ClickCapture() {
    useMapEvents({
      click(e: LeafletMouseEvent) {
        if (!readOnly) addPoint(e.latlng)
      },
    })
    return null
  }

  return (
    <Box padding={2} style={{height: 500}}>
      <MapContainer center={[59.91, 10.75]} zoom={6} style={{height: '500px'}} scrollWheelZoom>
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {value.map((point, index) => {
          const key = point._key ?? String(index)
          return (
            <Marker
              key={key}
              icon={ICON}
              position={[point.location.lat, point.location.lng]}
              draggable
              eventHandlers={{
                click: (e) => {
                  e.originalEvent.stopPropagation()
                },
                dragend: (e) => {
                  const {lat, lng} = e.target.getLatLng()
                  updatePoint(index, {
                    location: {
                      ...point.location,
                      lat,
                      lng,
                    },
                  })
                },
              }}
            >
              <Popup>
                <Box>
                  <Flex direction="row" gap={2}>
                    <Button
                      text="Rediger lokasjon"
                      tone="neutral"
                      onClick={(e) => {
                        e.nativeEvent?.stopPropagation()
                        handleMarkerClick(index)
                      }}
                    />
                    <Button
                      text="Slett lokasjon"
                      tone="critical"
                      onClick={(e) => {
                        e.nativeEvent?.stopPropagation()

                        const next = value.filter((_, i) => i !== index)
                        onChange(set(next))
                      }}
                    />
                  </Flex>
                </Box>
              </Popup>
            </Marker>
          )
        })}

        <ClickCapture />
      </MapContainer>
      {props.renderDefault(props)}
    </Box>
  )
}
