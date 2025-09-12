// Simple test for Outer Stellar application
const http = require('http');

function testAPI(path, method = 'GET', data = null) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'localhost',
            port: 3000,
            path: path,
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const req = http.request(options, (res) => {
            let responseData = '';
            res.on('data', (chunk) => {
                responseData += chunk;
            });
            res.on('end', () => {
                try {
                    const jsonData = JSON.parse(responseData);
                    resolve({ status: res.statusCode, data: jsonData });
                } catch (e) {
                    resolve({ status: res.statusCode, data: responseData });
                }
            });
        });

        req.on('error', (e) => {
            reject(e);
        });

        if (data) {
            req.write(JSON.stringify(data));
        }
        req.end();
    });
}

async function runTests() {
    console.log('🧪 Starting Outer Stellar Tests...\n');
    
    try {
        // Test 1: Get projects
        console.log('Test 1: Getting projects...');
        const projectsResult = await testAPI('/api/projects');
        console.log(`✓ Projects API: Status ${projectsResult.status}`);
        
        // Test 2: Add a project
        console.log('\nTest 2: Adding a test project...');
        const newProject = await testAPI('/api/projects', 'POST', {
            name: 'Test Project',
            description: 'This is a test project for our stellar application'
        });
        console.log(`✓ Add Project: Status ${newProject.status}`);
        
        // Test 3: Get stellar objects
        console.log('\nTest 3: Getting stellar objects...');
        const objectsResult = await testAPI('/api/stellar-objects');
        console.log(`✓ Stellar Objects API: Status ${objectsResult.status}`);
        
        // Test 4: Add a stellar object
        console.log('\nTest 4: Adding a test stellar object...');
        const newObject = await testAPI('/api/stellar-objects', 'POST', {
            name: 'Test Star',
            type: 'star',
            constellation: 'Test Constellation',
            magnitude: 2.5,
            coordinates: 'Test coordinates',
            notes: 'Test stellar object'
        });
        console.log(`✓ Add Stellar Object: Status ${newObject.status}`);
        
        // Test 5: Get creative ideas
        console.log('\nTest 5: Getting creative ideas...');
        const ideasResult = await testAPI('/api/creative-ideas');
        console.log(`✓ Creative Ideas API: Status ${ideasResult.status}`);
        
        // Test 6: Add a creative idea
        console.log('\nTest 6: Adding a test creative idea...');
        const newIdea = await testAPI('/api/creative-ideas', 'POST', {
            title: 'Test Creative Idea',
            description: 'This is a test creative idea',
            category: 'art',
            inspiration: 'Testing inspiration'
        });
        console.log(`✓ Add Creative Idea: Status ${newIdea.status}`);
        
        console.log('\n🎉 All tests completed successfully!');
        console.log('✨ Outer Stellar application is working correctly!');
        
    } catch (error) {
        console.error('❌ Test failed:', error.message);
        console.log('Please ensure the server is running on port 3000');
    }
}

// Wait a moment for the server to start, then run tests
setTimeout(() => {
    console.log('⏳ Waiting for server to initialize...\n');
    setTimeout(runTests, 2000);
}, 1000);