import React from 'react';

interface LevelIconComponentProps {
    isEditing: boolean;
}

const LevelIconComponent: React.FC<LevelIconComponentProps> = ({isEditing}) => {
    return (
        <div>
            {/* {isEditing ? (
                <>
                    <button onClick={onToggleEdit}>Save</button>
                    <button onClick={onAddChild}>Add Child</button>
                </>
            ) : (
                <button onClick={onToggleEdit}>Edit</button>
            )} */}
        </div>
    );
};

export default LevelIconComponent;
