"""Development entry point.

Usage:  .venv/bin/python main.py
Then open http://127.0.0.1:5000
"""
from app import create_app

application = create_app()

if __name__ == "__main__":
    print(f"BD Autos - MongoDB en {application.config['APP_CONFIG'].db_target}")
    print("Abre http://127.0.0.1:5000")
    application.run(debug=True)
