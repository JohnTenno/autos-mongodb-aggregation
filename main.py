from app import create_app
from app.database import config

app = create_app()

if __name__ == "__main__":
    print(f"BD Autos - MongoDB at {config.db_target}")
    app.run(debug=True)
