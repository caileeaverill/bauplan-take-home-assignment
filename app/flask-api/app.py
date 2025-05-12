from flask import Flask, jsonify, request
from flask_cors import CORS
import os
from dotenv import load_dotenv
import bauplan

app = Flask(__name__)
CORS(app)

load_dotenv()

client = bauplan.Client(api_key=os.getenv("BAUPLAN_API_KEY"))

@app.route('/api/commits', methods=['GET'])
def get_commits():
    try:
        # Get the number of commits from the query parameter, default to 25
        limit = int(request.args.get('limit', 25))

        # Fetch the commits using the specified limit
        commits = client.get_commits(ref='main', limit=limit)

        commit_list = []
        for commit in commits:
            commit_data = {
                "ref": {
                    "name": commit.ref.name,
                    "hash": commit.ref.hash,
                    "type": commit.ref.type
                },
                "message": commit.message,
                "authors": [
                    {
                        "name": author.name,
                        "email": author.email
                    } for author in commit.authors
                ],
                "authored_date": commit.authored_date.isoformat(),
                "committer": {
                    "name": commit.committer.name if commit.committer else None,
                    "email": commit.committer.email if commit.committer else None
                },
                "committed_date": commit.committed_date.isoformat(),
                "parent_ref": {
                    "name": commit.parent_ref.name,
                    "hash": commit.parent_ref.hash,
                    "type": commit.parent_ref.type
                },
                "parent_hashes": commit.parent_hashes,
                "properties": commit.properties,
                "signed_off_by": commit.signed_off_by
            }
            commit_list.append(commit_data)

        return jsonify({"commits": commit_list})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    # Run the Flask app
    app.run(debug=True, host='0.0.0.0', port=8000)
