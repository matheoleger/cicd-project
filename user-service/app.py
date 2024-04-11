from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)

# Connect to MongoDB
client = MongoClient('mongodb://mongodb:27017')
db = client['userdb']
collection = db['user']

@app.route('/user', methods=['GET'])
def get_user_data():
    # Fetch all user data from MongoDB
    cursor = collection.find({}, {'_id': 0})
    user_data = list(cursor)
    return jsonify(user_data)

@app.route('/user', methods=['POST'])
def create_user():
    # Create a user and persist it in MongoDB
    data = request.json
    new_user = {'firstname': data['firstname'], 'lastname': data['lastname']}
    result = collection.insert_one(new_user)
    return jsonify({'message': f'User created with ID: {result.inserted_id}'})

if __name__ == '__main__':
    app.run(host="0.0.0.0",port=3001)