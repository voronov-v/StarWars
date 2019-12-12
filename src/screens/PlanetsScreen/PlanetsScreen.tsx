import React, {useEffect, useState} from "react";
import {View, Text, StyleSheet} from "react-native";

interface IPlanet {
    name: string
    rotation_period: string
    orbital_period: string
    diameter: string
    climate: string
    gravity: string
    terrain: string
    population: string
    residents: string[]
    films: string[]
    created: Date
    url: string
}
export const PlanetsScreen = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function anyNameFunction() {
            const resp = await fetch('https://swapi.co/api/planets/');
            const data = await resp.json();
            setData(data.results);
        }

        anyNameFunction();
    }, []);

    return (
        <View style={styles.container}>
            {data.length ?
                data.map((planet: IPlanet,index) => <Text key={index}>{planet.name}</Text>)
                :
                <Text>No planets to show</Text>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});