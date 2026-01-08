import {db} from './connection.ts'
import { habitTags, entries, habits, tags, users } from './schema.ts'

const seed = async () => {
    console.log("🌱Starting database seed...")

    try {
        console.log("Clearing existing database")
        await db.delete(entries)
        await db.delete(habitTags)
        await db.delete(habits)
        await db.delete(tags)
        await db.delete(users)

        const [demoUser] = await db.insert(users).values({
            email: "demo@app.com",
            password: "password",
            firstName: "demo",
            lastName: "person",
            username: "demo",
        })
        .returning()

        console.log("creating tags...")
        const [healthTag] = await db.insert(tags).values({
            name: "Health", 
            color: "#0f0f0f",
        }).returning()

        const [exerciseHabit] = await db.insert(habits).values({
            userId: demoUser.id,
            name: "Exercise",
            description: "Daily workout",
            frequency: "daily",
            targetCount: 1,
        }).returning()

        await db.insert(habitTags).values({
            habitId: exerciseHabit.id,
            tagId: healthTag.id
        })

        console.log("adding completion entries...")

        const today = new Date()

        for (let i = 0; i < 7; i++) {
            const date = new Date(today);
            date.setDate(date.getDate() - i)
            await db.insert(entries).values({
                habitId: exerciseHabit.id,
                completionDate: date,
            })
        }
        today.setHours(12, 0, 0, 0)

        console.log("data seeded succesfully")
        console.log("user credentials:")
        console.log(`email: ${demoUser.email}`)
        console.log(`username: ${demoUser.username}`)
        console.log(`password: ${demoUser.password}`)
    } catch (err) {
        console.log("Seed Failed")
        process.exit(1)
    }
}

if(import.meta.url === `file://${process.argv[1]}`) {
    seed().then(() => process.exit(0))
    .catch(() => process.exit(1))
}

export default seed