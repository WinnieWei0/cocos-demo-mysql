import { Entity, Property } from "@mikro-orm/core";
import { BaseEntity } from './BaseEntity';

/**
 * Entity to represent the user in the database and throughout the server 
 */
@Entity()
export class User extends BaseEntity {
    
    @Property() username!: string;
    @Property() email!: string;
    @Property() password!: string;
    @Property() pendingSessionId: string;
    @Property() pendingSessionTimestamp: number;
    @Property() activeSessionId: string;
    @Property() progress: string = "0,0";
    @Property() prevGrid: string = "0,0";
    
    // Position fields (flattened for MySQL)
    @Property() positionX: number;
    @Property() positionY: number;
    @Property() positionZ: number;
    
    // Rotation fields (flattened for MySQL)
    @Property() rotationX: number;
    @Property() rotationY: number;
    @Property() rotationZ: number;
    @Property() rotationW: number;
    
    // Avatar fields (flattened for MySQL)
    @Property() avatarSkinColor: string = "default";
    @Property() avatarShirtColor: string = "default";
    @Property() avatarPantsColor: string = "default";
    @Property() avatarHatColor: string = "default";
    @Property() avatarHatChoice: number = 1;
    
    @Property() coins: number;
}