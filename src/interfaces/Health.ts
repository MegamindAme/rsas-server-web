export interface Health {
    last_config_reload:   number;
    mount_pools:          MountPools;
    mounts:               Mounts;
    total_listener_count: number;
    total_source_count:   number;
}

export interface MountPools {
    default: Default;
}

export interface Default {
    listener_count: number;
}

export interface Mounts {
    "/radio": Radio;
}

export interface Radio {
    format:         Format;
    listener_count: number;
    metadata:       Metadata;
    status:         string;
}

export interface Format {
    bitrate:      number;
    channels:     number;
    codec:        string;
    content_type: string;
    samplerate:   number;
}

export interface Metadata {
    now_playing: string;
}
