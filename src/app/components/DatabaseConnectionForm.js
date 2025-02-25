"use client"
import {useState} from 'react';
import {useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {Container, Box, Typography, TextField, Button} from "@mui/material";
import axios from "axios";

export default function DatabaseConnectionForm() {
    const router = useRouter();
    useEffect(() => {

        if (!router.isReady) return;
        console.log('Database Connection Form mounted');
    }, [router.isReady]);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const [databaseManager, setDatabaseManager] = useState('postgresql');
    const [host, setHost] = useState('localhost');
    const [port, setPort] = useState(5432);
    const [databaseName, setDatabaseName] = useState('for-devs-university');
    const [user, setUser] = useState('postgres');
    const [password, setPassword] = useState('qwerty');
    const handleSubmit = async (event) => {
        event.preventDefault();
        const connectionData = {
            databaseManager,
            host,
            port,
            databaseName,
            user,
            password
        };
        try {
            // Realizar la petición POST al servidor
            const response = await fetch(`${apiUrl}/api/connect-database`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(connectionData)
            });
            // Manejar la respuesta
            if (response.ok) {
                const responseData = await response.text();
                router.push('/dashboard');
            } else {
                console.log('Conexión fallida: ', await response.text());
            }

        } catch (error) {
            // Manejar el error
            console.error('Error al conectar con la base de datos', error);
        }

    };


    return <Container component="main" maxWidth="xs">
        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Typography component="h1" variant="h5">
                Database Connection Form
            </Typography>
            <Box component="form" noValidate sx={{mt: 1}} onSubmit={handleSubmit}>
                <TextField
                    margin="normal"
                    fullWidth
                    id="databaseManager"
                    label="Database Manager"
                    name="databaseManager"
                    value={databaseManager}
                    onChange={(e) => setDatabaseManager(e.target.value)}
                    autoFocus
                />
                <TextField
                    margin="normal"
                    fullWidth
                    id="host"
                    label="Host"
                    name="host"
                    value={host}
                    onChange={(e) => setHost(e.target.value)}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    name="port"
                    label="Port"
                    id="port"
                    type="number"
                    value={port}
                    onChange={(e) => setPort(e.target.value)}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    id="databaseName"
                    label="Database Name"
                    name="databaseName"
                    value={databaseName}
                    onChange={(e) => setDatabaseName(e.target.value)}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    id="user"
                    label="User"
                    name="user"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{mt: 3, mb: 2}}
                >
                    Connect
                </Button>
            </Box>
        </Box>
    </Container>

}
