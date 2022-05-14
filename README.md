# backend-node
Repo that contains the Backend code of our node server.

The heart of the project KidErra by SheHacks for the Hack !T Terra challenge.

The provided services :
- Receive data from the Terra api for a specific user.
- 
- Call the Flask server to receive a prediction based on the data retrieved from Terra.
- Signal the client lock-screen-service (on the child's device) to blur/lock the screen temporarily (in case the model's predicts that the child is stressed).
- Send continious data to the client mobile app (on the parent's smart device) to keep track of the child's current state.
