import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import moment from 'moment';

const Calendar = () => {
  const [fecha, setFecha] = useState(moment());
  const [comidas, setComidas] = useState({});
  const [selectedDay, setSelectedDay] = useState(moment().format('YYYY-MM-DD'));

  const cambiarSemana = (incremento) => {
    setFecha(fecha.clone().add(incremento, 'week'));
    setSelectedDay(null);
  };

  const handleDayPress = (fechaDia) => {
    setSelectedDay(fechaDia);
  };

  const handleInputChange = (valor) => {
    const nuevasComidas = { ...comidas, [selectedDay]: valor };
    setComidas(nuevasComidas);
  };

  const diasSemana = moment.weekdaysShort();
  const diasNumeros = Array.from({ length: 7 }, (_, index) =>
    fecha.clone().startOf('week').add(index, 'day').format('D')
  );

  return (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity onPress={() => cambiarSemana(-1)}>
          <Text>{'<'}</Text>
        </TouchableOpacity>
        <Text style={{ marginHorizontal: 10 }}>{fecha.format('MMMM YYYY')}</Text>
        <TouchableOpacity onPress={() => cambiarSemana(1)}>
          <Text>{'>'}</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
        {diasSemana.map((dia, index) => (
          <TouchableOpacity
            key={dia}
            onPress={() =>
              handleDayPress(fecha.clone().startOf('week').add(index, 'day').format('YYYY-MM-DD'))
            }
            style={{ flex: 1, alignItems: 'center' }}
          >
            <Text>{diasNumeros[index]}</Text>
            <Text>{dia}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
        <Text>{moment(selectedDay).format('D')}</Text>
        <TextInput
          value={comidas[selectedDay] || ''}
          onChangeText={handleInputChange}
          placeholder="Ingresa tu comida"
          style={{ borderWidth: 1, padding: 5 }}
        />
      </View>
    </View>
  );
};

export default Calendar;
