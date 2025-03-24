import pymongo

# Conectar a MongoDB
conn = pymongo.MongoClient("mongodb+srv://gerardomorales23s:srqV5VphAWgaZWNH@cluster0.5qp5c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

# Seleccionar la base de datos
midb = conn["Monitor"]

# Obtener la lista de colecciones
misColecciones = midb.list_collection_names()

# Verificar si la colección "datos" existe
if "datos" in misColecciones:
    print("La colección 'datos' SÍ existe en la base de datos")
else:
    print("La colección 'datos' NO existe en la base de datos")

