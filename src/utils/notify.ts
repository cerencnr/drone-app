import { notification } from "antd";

const DEFAULT_NOTIFICATION_CONFIG = {
    placement: "top",
    duration: 3,
};

const RETURN_TO_LAUNCH_SUCCESS_MESSAGE = {
    message: "Return to Base Success",
    description: "Returning to base...",
};

const RETURN_TO_LAUNCH_ERROR_MESSAGE = {
    message: "Return to Base Error",
    description: "Error returning to base.",
};

const TELEMETRY_WARNING_MESSAGE = {
    message: "Telemetry Warning",
    description: "Telemetry data is not available.",
}

const START_LAWNMOWER_SUCCESS_MESSAGE = {
    message: "Lawnmower Mission Started",
    description: "The lawnmower mission has been successfully started.",
}

const START_LAWNMOWER_ERROR_MESSAGE = {
    message: "Lawnmower Mission Error",
    description: "Failed to start lawnmower mission.",
}

const START_GENERIC_MISSION_SUCCESS_MESSAGE = {
    message: "Generic Mission Started",
    description: "The generic mission has been successfully started.",
}

const START_GENERIC_MISSION_ERROR_MESSAGE = {
    message: "Generic Mission Error",
    description: "Failed to start generic mission.",
}

const GENERATE_LAWNMOWER_SUCCESS_MESSAGE = {
    message: "Lawnmower Mission Generated",
    description: "The lawnmower mission has been successfully generated.",
}

const GENERATE_LAWNMOWER_ERROR_MESSAGE = {
    message: "Lawnmower Mission Generation Error",
    description: "Failed to generate lawnmower mission.",
};

export function notifyReturnSuccess() {
    notification.success({
        ...DEFAULT_NOTIFICATION_CONFIG,
        ...RETURN_TO_LAUNCH_SUCCESS_MESSAGE,
    });
}

export function notifyReturnError() {
    notification.error({
        ...DEFAULT_NOTIFICATION_CONFIG,
        ...RETURN_TO_LAUNCH_ERROR_MESSAGE,
    });
}

export function notifyTelemetryWarning() {
    notification.error({
        ...DEFAULT_NOTIFICATION_CONFIG,
        ...TELEMETRY_WARNING_MESSAGE,
    });
}

export function notifyStartLawnmowerMissionSuccess() {
    notification.success({
        ...DEFAULT_NOTIFICATION_CONFIG,
        ...START_LAWNMOWER_SUCCESS_MESSAGE,
    });
}

export function notifyStartGenericMissionSuccess() {
    notification.success({
        ...DEFAULT_NOTIFICATION_CONFIG,
        ...START_GENERIC_MISSION_SUCCESS_MESSAGE,
    });
}

export function notifyStartLawnmowerMissionError() {
    notification.error({
        ...DEFAULT_NOTIFICATION_CONFIG,
        ...START_LAWNMOWER_ERROR_MESSAGE,
    });
}

export function notifyStartGenericMissionError() {
    notification.error({
        ...DEFAULT_NOTIFICATION_CONFIG,
        ...START_GENERIC_MISSION_ERROR_MESSAGE,
    });
}

export function notifyGenerateLawnmowerMissionSuccess() {
    notification.success({
        ...DEFAULT_NOTIFICATION_CONFIG,
        ...GENERATE_LAWNMOWER_SUCCESS_MESSAGE,
    });
}

export function notifyGenerateLawnmowerMissionError() {
    notification.error({
        ...DEFAULT_NOTIFICATION_CONFIG,
        ...GENERATE_LAWNMOWER_ERROR_MESSAGE,
    });
}
