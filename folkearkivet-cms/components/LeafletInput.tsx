import {useState} from 'react'
import {MapContainer, TileLayer, Marker, useMapEvents} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import {uuid} from '@sanity/uuid'
import {TrashIcon} from '@sanity/icons'

import type {LeafletMouseEvent, LatLng, LatLngExpression} from 'leaflet'

import {set, type ObjectInputProps, type GeopointValue} from 'sanity'
import {Box, Button, Card, Dialog, Flex, Label, Stack, TextArea, TextInput} from '@sanity/ui'

type MapPoint = {
  _key?: string
  location: GeopointValue
  title?: string
  detail?: string
}

export const LeafletInput = (props: ObjectInputProps<MapPoint[]>) => {
  const {value = [], onChange, readOnly} = props

  const [open, setOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const handleDelete = () => {
    if (selectedIndex == null) return
    const next = value.filter((_, i) => i !== selectedIndex)
    onChange(set(next))
    setOpen(false)
    setSelectedIndex(null)
  }

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
    setSelectedIndex(next.length - 1)
    setOpen(true)
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
        {value.map((point, index) => {
          const key = point._key ?? String(index)
          return (
            <Marker
              key={key}
              position={[point.location.lat, point.location.lng]}
              draggable
              eventHandlers={{
                click: () => {
                  setSelectedIndex(index)
                  setOpen(true)
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
            />
          )
        })}
        {open &&
          selectedIndex != null &&
          (() => {
            const selected = value[selectedIndex]

            return (
              <Dialog id="edit-dialog" onClose={() => setOpen(false)} header="Lokasjon" open={open}>
                <Box padding={4}>
                  <Stack paddingBottom={4} space={[3, 3, 4, 5]}>
                    <Card>
                      <Label size={6} style={{marginBottom: '8px'}}>
                        Tittel
                      </Label>
                      <TextInput
                        value={selected.title}
                        onChange={(e) => updatePoint(selectedIndex, {title: e.currentTarget.value})}
                        padding={[3, 3, 4]}
                        placeholder="Tittel"
                      />
                    </Card>
                    <Card>
                      <Label size={6} style={{marginBottom: '8px'}}>
                        Beskrivelse
                      </Label>
                      <TextArea
                        value={selected.detail}
                        onChange={(e) =>
                          updatePoint(selectedIndex, {detail: e.currentTarget.value})
                        }
                        padding={[3, 3, 4]}
                        placeholder="Beskrivelse"
                      />
                    </Card>
                    <Flex direction="row" justify="space-between">
                      <Button
                        type="button"
                        tone="critical"
                        icon={TrashIcon}
                        text="Delete"
                        onClick={handleDelete}
                      />
                    </Flex>
                  </Stack>
                </Box>
              </Dialog>
            )
          })()}

        <ClickCapture />
      </MapContainer>
    </Box>
  )
}
