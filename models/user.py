from config.database import db  # Cambio aquí: import absoluto

class Usuario(db.Model):
    __tablename__ = 'usuarios'
    __table_args__ = {'schema': 'centro_medico'}

    usuario_id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    rol = db.Column(db.String(20), nullable=False)