// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.19;

contract vote{

    address public electionCommision;
    address public winner;

     struct voter{

        string name;
        uint age;
        uint voterId;
        string gender;
        uint voteCandidateId;
        address voterAddress;
     }

     struct candidate{

        string name;
        uint age;
        string gender;
        string party;
        uint CandidateId;
        address candidateAddress;
        uint votes;

     }

     uint nextCandidateId=1;
     uint nextVoterId =1;
     uint startTime;
     uint endTime;
     bool stopVoting;   

     //mapping  of struct to store voter details
     mapping (uint =>voter) public voterDetails;

     //mapping of struct to store candidate details
     mapping (uint =>candidate)public candidateDetails;

     constructor (){
        electionCommision=msg.sender;
     }

     //function for register the candidate and add the details in candidateDetails mapping
     function candidateRegistration(string memory name,uint age,string memory party , string memory gender,uint CandidateId, address candidateAddress,uint votes)external{
        require(age>=18,"you are below 18");
        require(candidateVerification(msg.sender),"you are already registered");
        require(nextCandidateId<3,"registration full");

        candidateDetails[nextCandidateId]=candidate(name,age,party,gender,CandidateId,candidateAddress,votes);
        nextCandidateId++;
     }


     //fucntion for verification of candidate 
     function candidateVerification(address person)internal view returns(bool){

        for(uint i=1;i<nextCandidateId;i++){
            if(candidateDetails[i].candidateAddress==person){
                return false;
            }
        }
        
            
                return true;
            }
        
     

        //function for getting candidateList
        function candidateList()public view returns(candidate[]memory){

            candidate[]memory arr=new candidate[](nextCandidateId-1);

            for(uint i=1;i<nextCandidateId;i++){
                arr[i-1]=candidateDetails[i];
            }

            return arr;
        

     }

     //function for registration of voters
     function voterRegistration(  string memory name, uint age, uint voterId,string memory gender,uint voteCandidateId,address voterAddress)external{
        require(age<18,"you are below 18");
        require(voterVerification(msg.sender),"you have already registered");

        voterDetails[nextVoterId]=voter(name,age,voterId,gender,voteCandidateId,voterAddress);
     }

     //function for verify the voter
     function voterVerification(address user)internal view returns(bool){
        for(uint i=1;i<nextVoterId;i++){
            if(voterDetails[i].voterAddress==user){
                return false;
            }
        }
        return true;

        }

        //function for getting the voterList
        function voterList()public view returns(voter[]memory){
            voter[]memory arr1=new voter[](nextVoterId-1);

            for(uint i=1; i<nextVoterId;i++){
                arr1[i-1]=voterDetails[i];
            }

            return arr1;
        }
        
        //modifier to check voting is over or not
        modifier isVotingOver(){
            require(endTime>block.timestamp || stopVoting,"voting is over");
            _;

        }



        //function for voting 
        function voting(uint voterId,uint id) external isVotingOver{
            require(voterDetails[voterId].voterAddress==msg.sender,"you are not registered");
            require(voterDetails[voterId].voteCandidateId==0,"you have already voted");
            require(block.timestamp>startTime,"voting has not started ");
            require(nextCandidateId>2,"the candidate registration is not done yet");
            require(id>0 && id<3,"candidate does not exiest");

            voterDetails[voterId].voteCandidateId=id;
            candidateDetails[id].votes++;

        }

        //function to set the voting timing and only accesible by the election commision
        function voteTime(uint _startTime,uint _endTime)external{
            require(electionCommision==msg.sender,"you are not from election commision");

        startTime=block.timestamp+_startTime;  //5pm+5  minutes(5:05)
        endTime=block.timestamp+_endTime;      //5pm+20 minutes(5:20)
        stopVoting=false;    

        }

        //function to check the status of voting for users
        function votingStatus()external view returns(string memory){

            if(startTime==0){
                return "voting is not started ";
            }
            
            else if(startTime!=0 && block.timestamp<endTime){
                return "voting is in progress";
            }

            return "Voting Ended";

        }

        //function to check the result of the voting and check the winner
        function result()external{
            require(electionCommision==msg.sender,"you are not from election commision");

            candidate[]memory arr1=new candidate[](nextCandidateId-1);

            arr1=candidateList();

            if(arr1[0].votes>arr1[1].votes){
                winner=arr1[0].candidateAddress;
            }
            else{
                winner=arr1[1].candidateAddress;
            }
        }

            //function to stop voting in case of any emergency
            function emergency()public{
                require(electionCommision==msg.sender,"you are not from election comission");
                stopVoting=true;
            }

            



        }
     


     

