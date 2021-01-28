import React, { Component } from 'react';
import { AppRegistry, Text, View, TouchableHighlight, TextInput, Dimensions, StyleSheet, ImageBackground, Image } from 'react-native';
import Constants from 'expo-constants';

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

export default class App extends Component {
    state = {
        teamArray: [
            {
                teamName: 'Team 1',
                score: 0,
                pim: 0,
                wins: 0,
                losses: 0,
                ties: 0,
            },
            {
                teamName: 'Team 2',
                pim: 0,
                score: 0,
                wins: 0,
                losses: 0,
                ties: 0,
            },
        ],
        scoringPageDisplay: 'block',
        teamNamesPageDisplay: 'none',
        standingsPageDisplay: 'none',
    };
    
    updateName = (index, name) => {
        let newTeamsArray = [...this.state.teamArray];
        newTeamsArray[index] = {...newTeamsArray[index], teamName: name}
        this.setState({teamArray: newTeamsArray});
    };
    
    addScore = (index) => {
        this.state.teamArray[index].score = this.state.teamArray[index].score + 1
        this.setState({});
    };
    
    addPIM = (index, minutes) => {
        this.state.teamArray[index].pim = this.state.teamArray[index].pim + minutes
        this.setState({});
    };
    
    submitGame = () => {
        let oldTeamsArray = [...this.state.teamArray];
        
        var team1Name = oldTeamsArray[0].teamName;
        var team2Name = oldTeamsArray[1].teamName;
        
        var winTeam1 = oldTeamsArray[0].wins;
        var winTeam2 = oldTeamsArray[1].wins;
        var lossTeam1 = oldTeamsArray[0].losses;
        var lossTeam2 = oldTeamsArray[1].losses;
        var tieTeam1 = oldTeamsArray[0].ties;
        var tieTeam2 = oldTeamsArray[1].ties;
        
        if (oldTeamsArray[0].score > oldTeamsArray[1].score) {
            winTeam1 = oldTeamsArray[0].wins + 1;
            lossTeam2 = oldTeamsArray[1].losses + 1;
        } else if (oldTeamsArray[0].score < oldTeamsArray[1].score) {
            winTeam2 = oldTeamsArray[1].wins + 1;
            lossTeam1 = oldTeamsArray[0].losses + 1;
        } else if (oldTeamsArray[0].score = oldTeamsArray[1].score) {
            tieTeam1 = oldTeamsArray[0].ties + 1;
            tieTeam2 = oldTeamsArray[1].ties + 1;
        }
        
        let obj1 = {
            teamName: team1Name,
            pim: oldTeamsArray[0].pim,
            score: 0,
            wins: winTeam1,
            losses: lossTeam1,
            ties: tieTeam1,
        };
        let obj2 = {
            teamName: team2Name,
            score: 0,
            pim: oldTeamsArray[1].pim,
            wins: winTeam2,
            losses: lossTeam2,
            ties: tieTeam2,
        };
        let newTeamsArray = [];
        newTeamsArray.push(obj1);
        newTeamsArray.push(obj2);
        this.setState({teamArray: newTeamsArray});
    };
    
    handleScoringPagePress = () => this.setState(state => ({
        scoringPageDisplay: 'block',
        teamNamesPageDisplay: 'none',
        standingsPageDisplay: 'none',
    }));
    
    handleTeamNamesPagePress = () => this.setState(state => ({
        scoringPageDisplay: 'none',
        teamNamesPageDisplay: 'block',
        standingsPageDisplay: 'none',
    }));
    
    handleStandingsPagePress = () => this.setState(state => ({
        scoringPageDisplay: 'none',
        teamNamesPageDisplay: 'none',
        standingsPageDisplay: 'block',
    }));
    
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.contentContainer}>
                    <View style={styles.imageContainer}>
                        <Image
                            source={{ uri: 'https://codehs.com/uploads/f7cd2087806683ed2bdcc7fd9c9ea3e1' }}
                            style={{ height: deviceHeight/8, width: deviceHeight/8 }}
                        />
                        
                        <Image
                            source={{ uri: 'https://codehs.com/uploads/261ee9d525367180041c8057d4293774' }}
                            style={{ height: deviceHeight/15, width: deviceHeight/7 }}
                        />
                    </View>
                    
                    <View style={styles.titleBox}>
                        <Text style={styles.titleText}>
                            Hockey Scoreboard
                        </Text>
                    </View>
                    
                    <View style={{ display: this.state.scoringPageDisplay }}>
                        <View style={styles.buttonContainerMain}>
                            <View style={styles.buttonContainer}>
                                {this.state.teamArray.map((team, index) => (    
                                    <TouchableHighlight 
                                        onPress = {() => this.addScore(index)}
                                    > 
                                        <View style={styles.button}>
                                            <Text style={styles.buttonText}>
                                                Score!
                                            </Text>
                                        </View>
                                    </TouchableHighlight>
                                ))}
                            </View>
                            
                            <View style={styles.buttonContainer}>
                                {this.state.teamArray.map((team, index) => (     
                                    <TouchableHighlight 
                                        onPress = {() => this.addPIM(index, 2)}
                                    >
                                        <View style={styles.button}>
                                            <Text style={styles.buttonText}>
                                                2 Minute Penalty
                                            </Text>
                                        </View>
                                    </TouchableHighlight>
                                ))}
                            </View>
                            
                            <View style={styles.buttonContainer}>
                                {this.state.teamArray.map((team, index) => ( 
                                    <TouchableHighlight 
                                        onPress = {() => this.addPIM(index, 5)}
                                    >
                                        <View style={styles.button}>
                                            <Text style={styles.buttonText}>
                                                5 Minute Penalty
                                            </Text>
                                        </View>
                                    </TouchableHighlight>
                                ))}
                            </View>
                            
                            <View style={styles.scoreContainer}>
                                {this.state.teamArray.map((team, index) => (
                                    <Text style={styles.scoreText}>
                                        {team.teamName} Score: {team.score}
                                    </Text>
                                ))}
                            </View>
                            
                            <View style={styles.scoreContainer}>
                                {this.state.teamArray.map((team, index) => (
                                    <Text style={styles.scoreText}>
                                        {team.teamName} PIM: {team.pim}
                                    </Text>
                                ))}
                            </View>
                        </View>
                        
                        <View style={styles.submitContainer}>
                            <TouchableHighlight style={styles.submitButton}
                            onPress={this.submitGame}
                            >
                                <Text style={styles.navButtonText}>
                                    Submit
                                </Text>
                            </TouchableHighlight>
        
                        </View>
                    </View>
                    
                    <View style={{ display: this.state.teamNamesPageDisplay }}>
                        <View style={styles.buttonContainerMain}>
                            {this.state.teamArray.map((team, index) => (
                                <TextInput style={styles.teamTextContainer}
                                onChangeText={(name) => this.updateName(index, name)}
                                value={team.teamName}
                                />
                            ))}
                            
                        </View>
                    </View>
                    
                    <View style={{ display: this.state.standingsPageDisplay }}>
                        <View style={styles.teamStandingsContainerMain}>
                            {this.state.teamArray.map((team, index) => (   
                                <View style={styles.teamStandingsContainerInner}>
                                    <Text style={styles.recordText}>
                                        {team.teamName} Record: 
                                    </Text>
                                    <Text style={styles.recordText}>
                                        {team.wins} - {team.losses} - {team.ties}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    </View>
                </View>
                
                <View style={styles.navbarContainer}>
                    <TouchableHighlight style={styles.navButton}
                    onPress={this.handleScoringPagePress}
                    >
                        <Text style={styles.navButtonText}>
                            Scoring
                        </Text>
                    </TouchableHighlight>
                    
                    <TouchableHighlight style={styles.navButton}
                    onPress={this.handleTeamNamesPagePress}
                    >
                        <Text style={styles.navButtonText}>
                            Team Names
                        </Text>
                    </TouchableHighlight>
                    
                    <TouchableHighlight style={styles.navButton}
                    onPress={this.handleStandingsPagePress}
                    >
                        <Text style={styles.navButtonText}>
                            Standings
                        </Text>
                    </TouchableHighlight>
                </View>
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#03fcec',
    },
    contentContainer: {
        height: 7*(deviceHeight/8),
        width: deviceWidth,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#03fcec',
    },
    imageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        height: deviceHeight/6,
        width: deviceWidth,
    },
    titleBox: {
        height: deviceHeight/5,
        width: deviceWidth/5*4,
        backgroundColor: 'white',
        borderWidth: deviceHeight/80,
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleText: {
        color: 'black',
        fontSize: deviceHeight/15,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    buttonContainerMain: {
        height: deviceHeight/19*7,
        width: deviceWidth,
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'space-around',
        justifyContent: 'center',
        height: deviceHeight/10,
        width: deviceWidth,
    },
    scoreContainer: {
        flexDirection: 'row',
        alignItems: 'space-around',
        justifyContent: 'center',
        height: deviceHeight/30,
        width: deviceWidth,
    },
    submitContainer: {
        height: deviceHeight/2280*319,
        width: deviceWidth, 
        alignItems: 'center',
        justifyContent: 'center',
    },
    teamTextContainer: {
        height: deviceHeight/12,
        width: deviceWidth/3,
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: deviceHeight/100,
        alignItems: 'center',
        justifyContent: 'center',
        margin: deviceHeight/70,
        color: 'black',
        fontSize: deviceHeight/20,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    teamStandingsContainerMain: {
        height: deviceHeight/3,
        width: deviceWidth/3*2,
        backgroundColor: '#03fcec',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: deviceHeight/16,
    },
    teamStandingsContainerInner: {
        height: deviceHeight/6,
        width: deviceWidth/3*2,
        backgroundColor: '#03fcec',
        borderColor: 'black',
        borderWidth: deviceHeight/200,
        alignItems: 'center',
        justifyContent: 'center',
    },
    navbarContainer: {
        height: deviceHeight/8,
        width: deviceWidth,
        backgroundColor: '#A0A0A0',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderTopWidth: deviceHeight/120,
        borderColor: 'black',
    },
    teamText: {
        color: 'black',
        fontSize: deviceHeight/20,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    button: {
        height: deviceHeight/14,
        width: deviceWidth/3,
        backgroundColor: '#03fcec',
        borderColor: 'black',
        borderWidth: deviceHeight/200,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: deviceHeight/70,
        marginLeft: deviceHeight/70,
        marginRight: deviceHeight/70,
    },
    navButton: {
        height: deviceHeight/11,
        width: 4*(deviceWidth/15),
        backgroundColor: '#03fcec',
        borderColor: 'black',
        borderWidth: deviceHeight/200,
        alignItems: 'center',
        justifyContent: 'center',
        margin: deviceHeight/70,
    },
    submitButton: {
        height: deviceHeight/11,
        width: 11*(deviceWidth/15),
        backgroundColor: '#03fcec',
        borderColor: 'black',
        borderWidth: deviceHeight/200,
        alignItems: 'center',
        justifyContent: 'center',
        margin: deviceHeight/70,
    },
    scoreText: {
        color: 'black',
        fontSize: deviceHeight/30,
        textAlign: 'center',
        padding: deviceWidth/50,
    },
    buttonText: {
        color: 'black',
        fontSize: deviceHeight/30,
        textAlign: 'center',
    },
    navButtonText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: deviceHeight/35,
        textAlign: 'center',
    },
    recordText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: deviceHeight/35,
        textAlign: 'center',
        paddingTop: deviceHeight/100,
    },
});