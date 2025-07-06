import {useCallback} from 'react'
import {MapContainer, TileLayer, Marker, useMapEvents} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import {uuid} from '@sanity/uuid'

import type {LeafletMouseEvent, LatLng, LatLngExpression} from 'leaflet'

import {set, unset, type ObjectInputProps, type GeopointValue} from 'sanity'
import {Box, Dialog, TextArea, TextInput} from '@sanity/ui'

type MapPoint = {
  _key?: string
  location: GeopointValue
  title?: string
  detail?: string
}

export const LeafletInput = (props: ObjectInputProps<MapPoint[]>) => {
  const {value = [], onChange, readOnly} = props

  /** Push a Sanity patch */
  /**const commit = useCallback(
    ({lat, lng}: LatLng) => onChange(lat && lng ? set({lat, lng}) : unset()),
    [onChange],
  )**/

  const addPoint = ({lat, lng}: LatLng) => {
    const next = [
      ...value,
      {
        _key: uuid(),
        location: {lat, lng},
        title: '',
        detail: '',
      },
    ]
    onChange(set(next))
  }

  const updatePoint = (index: number, updates: Partial<MapPoint>) => {
    const current = value[index]
    if (!current) return
    const updated = {...current, ...updates}
    const next = [...value]
    next[index] = updated
    onChange(set(next))
  }

  function ClickCapture() {
    useMapEvents({
      click(e: LeafletMouseEvent) {
        if (!readOnly) addPoint(e.latlng)
      },
    })
    return null
  }

  const center: LatLngExpression = value[0]
    ? [value[0].location.lat ?? 0, value[0].location.lng ?? 0]
    : [0, 0]

  return (
    <Box padding={2} style={{height: 320}}>
      <MapContainer center={center} zoom={value ? 13 : 2} style={{height: 300}} scrollWheelZoom>
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {value.map((point, index) => (
          <Marker
            key={point._key ?? index}
            position={[point.location.lat, point.location.lng]}
            draggable
            eventHandlers={{
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
            <Dialog id={`${index}-${point.location.lat}-${point.location.lng}`}>
              <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                <label>
                  <strong>Title</strong>
                  <TextInput
                    fontSize={[2, 2, 3, 4]}
                    onChange={(event) => updatePoint(index, {title: event.target.value})}
                    padding={[3, 3, 4]}
                    placeholder="Tittel"
                    value={point.title ?? ''}
                  />
                </label>
                <label>
                  <strong>Detail</strong>
                  <TextArea
                    fontSize={[2, 2, 3, 4]}
                    onChange={(event) => updatePoint(index, {detail: event.target.value})}
                    padding={[3, 3, 4]}
                    placeholder="Beskrivelse"
                    value={point.detail ?? ''}
                  />
                </label>
              </div>
            </Dialog>
          </Marker>
        ))}

        <ClickCapture />
      </MapContainer>
    </Box>
  )
}
